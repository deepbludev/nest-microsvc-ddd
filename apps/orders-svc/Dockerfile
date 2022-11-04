FROM node:alpine as development

WORKDIR /workspace

COPY . .

RUN yarn global add @nrwl/cli
RUN yarn install

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /workspace

COPY . .

RUN yarn global add @nrwl/cli
RUN yarn install

EXPOSE 3333

CMD ["node", "dist/apps/orders-svc/main"]
