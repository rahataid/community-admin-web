# Install dependencies only when needed
FROM node:18-alpine3.17 AS deps
WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn install 

FROM node:18-alpine3.17 AS builder
WORKDIR /opt/app
COPY . .
COPY --from=deps /opt/app/node_modules ./node_modules
RUN yarn build

FROM node:18-alpine3.17 AS prodDeps
WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn install --production

# Production image, copy all the files and run next
FROM node:18-alpine3.17 AS runner
USER node
WORKDIR /usr/src/app
# COPY --chown=node:node --from=builder /opt/app/.env ./
COPY --chown=node:node --from=builder /opt/app/next.config.js ./
COPY --chown=node:node --from=builder /opt/app/public ./public
COPY --chown=node:node --from=builder /opt/app/.next ./.next
COPY --chown=node:node --from=prodDeps /opt/app/node_modules ./node_modules
CMD ["node_modules/.bin/next", "start"]