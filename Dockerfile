FROM node:latest 

WORKDIR /usr/app

RUN npm install -g ts-node-dev

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]