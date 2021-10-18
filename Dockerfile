FROM node:slim

WORKDIR /CapstoneProject

COPY index.js ./server/index.js

COPY package.json ./

RUN npm install