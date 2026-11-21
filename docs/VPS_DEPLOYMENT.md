# Production deployment

The `CI` workflow (`.github/workflows/ci.yaml`) validates pushes to every branch
and pull requests targeting `master`. The separate `Deploy` workflow
(`.github/workflows/deploy.yaml`) runs after successful CI for a push to
`master`. It checks out and deploys the exact commit that passed CI. A merge to
`master` publishes `ghcr.io/jamesmukumu/florahclient:<commit-sha>` and deploys
that immutable image to the VPS. The image is private.

Both workflow files must be committed. GitHub requires `deploy.yaml` to exist
on the repository's default branch for its `workflow_run` trigger to fire.
Failed CI runs and pull request CI runs never publish or deploy.

## One-time VPS setup

Run the following as a VPS administrator. Replace `DEPLOY_PUBLIC_KEY` with the
public key paired with the `VPS_SSH_PRIVATE_KEY` GitHub secret.

```bash
sudo adduser --disabled-password --gecos '' deploy
sudo usermod -aG docker deploy
sudo install -d -o deploy -g deploy -m 750 /opt/florahClient
sudo install -d -o deploy -g deploy -m 700 /home/deploy/.ssh
sudo tee /home/deploy/.ssh/authorized_keys >/dev/null <<'EOF'
DEPLOY_PUBLIC_KEY
EOF
sudo chown deploy:deploy /home/deploy/.ssh/authorized_keys
sudo chmod 600 /home/deploy/.ssh/authorized_keys
```

Docker-group membership is privileged. Restrict the deploy key to GitHub
Actions and do not reuse it for interactive administration.

Use the existing `/opt/florahClient/.env`, or create it using `.env.example` in
this repository as the variable reference. Use the actual production values and
protect the file:

```bash
sudo -u deploy nano /opt/florahClient/.env
sudo chmod 600 /opt/florahClient/.env
```

The initial deployment needs a working release to roll back to. Put its full
40-character image SHA in `/opt/florahClient/.deploy.env`. If a previous
deployment stored its state under `/opt/flora-advocates`, migrate the current
image tag before deploying:

```bash
sudo -u deploy sh -c 'printf "IMAGE_TAG=PUT_CURRENT_40_CHARACTER_SHA_HERE\\n" > /opt/florahClient/.deploy.env'
sudo chmod 600 /opt/florahClient/.deploy.env
```

Create a classic GitHub personal access token that has only `read:packages`.
As the deploy user, authenticate Docker once; never place this token in the
repository or `.env` file.

```bash
sudo -iu deploy
echo 'TOKEN_VALUE' | docker login ghcr.io -u jamesmukumu --password-stdin
```

Allow inbound SSH, HTTP, and HTTPS only. Keep port 3000 private, and allow the
VPS public IP to reach the PostgreSQL provider on port 5432.

## Nginx

Keep TLS certificate directives from the existing Nginx site. Its application
location should proxy only to the loopback-bound Docker service:

```nginx
server {
    server_name floracadvocates.co.ke www.floracadvocates.co.ke;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Validate before reloading:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## GitHub configuration

Create a `production` GitHub Environment and add these environment secrets:

| Secret | Value |
| --- | --- |
| `VPS_HOST` | VPS hostname or IP address |
| `VPS_PORT` | SSH port, normally `22` |
| `VPS_USER` | `deploy` |
| `VPS_SSH_PRIVATE_KEY` | private half of the dedicated deploy key |
| `VPS_KNOWN_HOSTS` | output of `ssh-keyscan -H VPS_HOST`, verified out-of-band |

Give GitHub Actions `contents: read` and `packages: write`. Configure branch
protection on `master` to require the `Verify application` check before merge.

## Release verification and rollback

The deployment script waits for Docker health, then checks both
`http://127.0.0.1:3000/api/health` and
`https://www.floracadvocates.co.ke/api/health`. That endpoint executes
`SELECT 1` against PostgreSQL, so a missing database connection returns HTTP
503. A failed release automatically starts the previous image tag and reports
the GitHub Actions job as failed.

To inspect an incident on the VPS:

```bash
cd /opt/florahClient
docker compose --env-file .deploy.env -f compose.production.yaml ps
docker compose --env-file .deploy.env -f compose.production.yaml logs --tail=200 app
```
