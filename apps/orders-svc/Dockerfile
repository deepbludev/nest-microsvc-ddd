FROM node:14.17.3-alpine

WORKDIR /workspace

COPY . .

RUN ["npm", "i", "-g", "@nrwl/cli"]
RUN ["npm", "i"]

EXPOSE 3333

ENTRYPOINT ["npx","nx","serve","orders-svc"]
