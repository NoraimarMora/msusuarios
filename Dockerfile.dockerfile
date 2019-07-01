FROM node:latest

COPY package*.json /app

WORKDIR /app

RUN npm install

COPY . /app

EXPOSE 80

CMD ["npm", "start"]