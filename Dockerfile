# Install the locked dependencies independently of application source changes.
FROM node:26.13.1-bookworm-slim AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps --no-audit --no-fund

# Build the SSR application and Nitro Node server.
FROM node:26.13.1-bookworm-slim AS build
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Run only the self-contained Nitro output as an unprivileged user.
FROM node:26.13.1-bookworm-slim AS runtime
WORKDIR /app
ARG VERSION=dev
LABEL org.opencontainers.image.title="Flora C & Company Advocates" \
      org.opencontainers.image.version="${VERSION}"
ENV NODE_ENV=production \
    NITRO_HOST=0.0.0.0 \
    NITRO_PORT=3000
COPY --from=build --chown=node:node /app/.output ./.output
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + process.env.NITRO_PORT + '/api/health', { signal: AbortSignal.timeout(3000) }).then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"
CMD ["node", ".output/server/index.mjs"]
