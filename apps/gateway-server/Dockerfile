# ─── 1) Builder stage ───────────────────────────
FROM node:18-alpine AS builder
WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY . .

RUN pnpm install

RUN cd apps/gateway-server && pnpm run build

# ─── 2) Production image ────────────────────────
FROM node:18-alpine AS runner
WORKDIR /usr/src/app

RUN apk update
RUN apk add --no-cache bash

COPY --from=builder /usr/src/app/package.json .
COPY --from=builder /usr/src/app/apps/gateway-server/private.pem .
COPY --from=builder /usr/src/app/apps/gateway-server/public.pem .
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/apps/gateway-server/config.yaml .

COPY --from=builder /usr/src/app/dist/ .
COPY --from=builder /usr/src/app/apps/gateway-server/package.json ./apps/gateway-server

ENV NODE_ENV=production

CMD ["node", "apps/gateway-server/src/main.js"]