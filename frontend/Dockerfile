FROM node:22-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

RUN npm i -g serve

COPY . .

EXPOSE 3000:3000

RUN npm run build

CMD [ "serve", "-n", "-s", "dist" ]