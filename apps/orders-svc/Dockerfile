FROM node:alpine as development

WORKDIR /workspace

COPY . .

RUN yarn global add @nrwl/cli
RUN yarn install

EXPOSE 3333

FROM node:alpine as production

WORKDIR /workspace

COPY . .

RUN yarn global add @nrwl/cli
RUN yarn install
RUN yarn nx run orders-svc:build:production

EXPOSE 3333
