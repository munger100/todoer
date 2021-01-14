FROM node:12.17-slim AS development
ENV PORT 3000

# Setup workspace
RUN apt-get -qy update && apt-get -qy install openssl
WORKDIR /app

## Install app dependencies
COPY package.json yarn.lock ./
RUN yarn
RUN yarn next telemetry disable

## Copy package
COPY . ./

EXPOSE 3000
ENTRYPOINT ["yarn", "dev"]

################################################################################

FROM development AS releaseBuilder

# Compile and use production dependencies
RUN yarn build
RUN yarn

################################################################################

FROM node:12.17-slim AS release
ENV NODE_ENV production
ENV PORT 80

RUN apt-get -qy update && apt-get -qy install openssl
WORKDIR /app

COPY --from=releaseBuilder /app/node_modules /app/node_modules
COPY --from=releaseBuilder /app/package.json /app/package.json
COPY --from=releaseBuilder /app/.env  /app/.env
COPY --from=releaseBuilder /app/.next /app/.next
COPY --from=releaseBuilder /app/prisma /app/prisma
COPY --from=releaseBuilder /app/public /app/public

RUN yarn next telemetry disable

ENTRYPOINT ["yarn", "start"]
