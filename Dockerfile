FROM node:16-buster-slim AS BUILD_IMAGE

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 1000000

COPY . ./

RUN yarn build

# remove development dependencies # This seems broken
#RUN yarn install --production --ignore-scripts --prefer-offline

RUN rm -rf src server

FROM node:16-buster-slim

WORKDIR /app

COPY --from=BUILD_IMAGE /app ./

RUN rm config.json

ENV CONFIG_DIRECTORY=/config

ENTRYPOINT [ "yarn", "start" ]

EXPOSE 3000
