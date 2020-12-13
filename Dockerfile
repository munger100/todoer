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
