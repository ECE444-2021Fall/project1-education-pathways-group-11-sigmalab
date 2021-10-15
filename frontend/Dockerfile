FROM node:16

USER node
WORKDIR '/app/frontend'

COPY --chown=node:node ./package.json .
COPY --chown=node:node ./package-lock.json .
RUN npm install
COPY --chown=node:node . .
CMD ["npm", "start"]