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
# The Nitro server needs Node only; omit npm and its bundled dependencies.
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx
ARG VERSION=dev
LABEL org.opencontainers.image.title="Flora C & Company Advocates" \
      org.opencontainers.image.version="${VERSION}"
ENV NODE_ENV=production \
    NITRO_HOST=0.0.0.0 \
    NITRO_PORT=3000
COPY --from=build --chown=node:node /app/.output ./.output
USER node
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
