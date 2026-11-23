#!/usr/bin/env bash

set -Eeuo pipefail

APP_DIR="${APP_DIR:-/opt/florahClient}"
COMPOSE_FILE="${APP_DIR}/compose.production.yaml"
DEPLOY_ENV="${APP_DIR}/.deploy.env"
CONTAINER_NAME="${CONTAINER_NAME:-floraadvocateswebsite}"
NEW_IMAGE_TAG="${1:?Provide the 40-character Git commit SHA to deploy}"

if [[ ! "${NEW_IMAGE_TAG}" =~ ^[a-f0-9]{40}$ ]]; then
  echo "The image tag must be a full lowercase Git SHA." >&2
  exit 2
fi

cd "${APP_DIR}"

if [[ ! -f .env ]]; then
  echo "${APP_DIR}/.env is missing." >&2
  exit 2
fi

if [[ -f "${DEPLOY_ENV}" ]]; then
  # shellcheck disable=SC1090
  source "${DEPLOY_ENV}"
fi

PREVIOUS_IMAGE_TAG="${IMAGE_TAG:-}"
COMPOSE_PROJECT_NAME="${COMPOSE_PROJECT_NAME:-flora-advocates}"

write_deploy_env() {
  local image_tag="$1"
  umask 077
  printf 'IMAGE_TAG=%s\n' "${image_tag}" > "${DEPLOY_ENV}"
}

compose() {
  docker compose --project-name "${COMPOSE_PROJECT_NAME}" --env-file "${DEPLOY_ENV}" -f "${COMPOSE_FILE}" "$@"
}

check_container_ownership() {
  local project_label

  if project_label="$(docker inspect --format '{{index .Config.Labels "com.docker.compose.project"}}' "${CONTAINER_NAME}" 2>/dev/null)"; then
    if [[ "${project_label}" != "${COMPOSE_PROJECT_NAME}" ]]; then
      echo "Container ${CONTAINER_NAME} belongs to project ${project_label:-none}, not ${COMPOSE_PROJECT_NAME}; remove it manually once before deploying." >&2
      exit 1
    fi
  fi
}

wait_for_healthy() {
  local attempt status response

  for attempt in {1..30}; do
    status="$(docker inspect --format '{{.State.Running}}' "${CONTAINER_NAME}" 2>/dev/null || true)"
    if [[ "${status}" != "true" ]]; then
      echo "Container ${CONTAINER_NAME} is not running (status: ${status:-not-created})." >&2
      docker logs --tail 50 "${CONTAINER_NAME}" || true
      return 1
    fi

    if response="$(curl --fail --silent --show-error --max-time 10 http://127.0.0.1:3000/api/health)" \
      && [[ "${response}" == *'"status":"ok"'* ]]; then
      return 0
    fi

    echo "Waiting for ${CONTAINER_NAME} readiness (attempt ${attempt}/30; status: ${status:-not-created})."
    sleep 3
  done

  return 1
}

deploy() {
  local image_tag="$1"
  write_deploy_env "${image_tag}"
  compose pull app
  compose up -d --no-build --remove-orphans app
  wait_for_healthy
}

check_container_ownership

if deploy "${NEW_IMAGE_TAG}"; then
  docker image prune --force --filter dangling=true
  echo "Deployment of ${NEW_IMAGE_TAG} completed successfully."
  exit 0
fi

echo "Deployment failed; restoring ${PREVIOUS_IMAGE_TAG:-no previous image available}." >&2

if [[ -n "${PREVIOUS_IMAGE_TAG}" ]]; then
  if deploy "${PREVIOUS_IMAGE_TAG}"; then
    echo "Rollback to ${PREVIOUS_IMAGE_TAG} completed." >&2
  else
    echo "Rollback failed; inspect Docker and Nginx logs immediately." >&2
  fi
else
  rm -f "${DEPLOY_ENV}"
  compose down --remove-orphans || true
fi

exit 1
