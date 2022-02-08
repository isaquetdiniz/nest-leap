# --------------> The build image
FROM node:16.13-alpine as builder

USER node

WORKDIR /home/node

COPY --chown=node:node package.json package-lock.json src/main/infra/prisma/schema.prisma ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run build


# --------------> The run image
FROM node:16.13-alpine as runner

RUN apk add dumb-init

USER node

WORKDIR /home/node

COPY --chown=node:node --from=builder /home/node/node_modules/ ./node_modules
COPY --chown=node:node --from=builder /home/node/dist ./dist/
COPY . .

CMD ["dumb-init", "node", "dist/main/server.js"]
