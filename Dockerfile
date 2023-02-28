FROM node:latest

WORKDIR /myapp

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["node", "server.js"]
