FROM node:18-alpine
EXPOSE 4000

WORKDIR /app

COPY ./package.* .
RUN npm i
COPY ./dist .

CMD [ "npm","run","start:prod" ]