FROM node:18.0-alpine

WORKDIR /usr/src/app

COPY ./package*.json .

COPY . .

RUN npm i

RUN npm i -D webpack-dev-server
