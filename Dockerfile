# ----------------------------------------------------------------
# Dockerfile used for prod
#
# Author: Christopher Wagner
# ----------------------------------------------------------------

# ----------------------------------------------------------------
# Build Stage
# ----------------------------------------------------------------

FROM node:latest as build
WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

RUN npm rebuild bcrypt --build-from-source

RUN npm prune --production


# ----------------------------------------------------------------
# Serve Stage
# ----------------------------------------------------------------

FROM node:lts-alpine@sha256:f07ead757c93bc5e9e79978075217851d45a5d8e5c48eaf823e7f12d9bbc1d3c

RUN apk add dumb-init

RUN apk --no-cache add --virtual builds-deps build-base python

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/dist/ /usr/src/app/dist/
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node --from=build /usr/src/app/package.json /usr/src/app/package.json

RUN chmod -w /usr/src/app
COPY .env .
USER node

CMD ["dumb-init", "node", "-r", "./dist/main.js"]

EXPOSE 3000