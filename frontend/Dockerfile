FROM node:16-slim

USER node
WORKDIR '/app/frontend'

COPY --chown=node:node ./package.json .
# COPY --chown=node:node ./package-lock.json .
# ENV NODE_OPTIONS=--openssl-legacy-provider
RUN yarn install
COPY --chown=node:node . .
CMD ["yarn", "start"]
