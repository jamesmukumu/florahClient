# Flora C & Company Advocates

## Docker usage

Run these commands from the `client` directory. Create `.env` from `.env.example`
and replace the placeholders with your runtime settings; never pass secrets as
build arguments. For example, in PowerShell:

```powershell
Copy-Item .env.example .env
# Edit .env before starting the container.
docker build -t flora-advocates .
docker run -d --init --name flora-advocates -p 3000:3000 --env-file .env flora-advocates
docker logs -f flora-advocates
docker stop flora-advocates
```

Alternatively, run `docker compose up -d --build`, view logs with
`docker compose logs -f`, and stop with `docker compose down`. Compose uses the
image healthcheck and does not create a database.

The server listens on port 3000. `/api/health` checks process liveness, not
database connectivity. The image runs the Nitro Node server with SSR and the
runtime sitemap; it is not a static export.

Set these variables in `.env` for the container, or in your deployment's runtime
environment:

| Variable | Purpose |
| --- | --- |
| `NUXT_DB_HOST` | External PostgreSQL host |
| `NUXT_DB_PORT` | PostgreSQL port |
| `NUXT_DB_USER` | Database user |
| `NUXT_DB_PASSWORD` | Database password |
| `NUXT_DB_DB_NAME` | Database name |
| `NUXT_TURNSTILE_SECRET_KEY` | Server-side Turnstile verification secret |

The database also accepts the existing `DB_HOST`, `DB_PORT`, `DB_USER`,
`DB_PASSWORD`, and `DB_NAME` variables at runtime; `NUXT_DB_*` takes precedence.
Use `NUXT_TURNSTILE_SECRET_KEY` instead of `TURNSTILE_SECRET_KEY`. The public
Turnstile site key and site URL are configured in `nuxt.config.ts`. The container
host needs outbound access to the
database and may need to be added to its IP allowlist. The existing pool
enables SSL but sets `rejectUnauthorized: false`, so it does not verify the
server certificate; configure verified TLS separately if required.

The Vercel Analytics and Speed Insights integrations are unchanged and their
scripts may not be available outside Vercel. Consider making them conditional
or removing them for non-Vercel deployments. The existing database API handlers
may return caught errors as successful HTTP responses; the healthcheck does
not detect database failures.
