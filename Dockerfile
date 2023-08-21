FROM node


WORKDIR /usr/app

RUN npm install -g ts-node-dev

COPY package.json /usr/app/

RUN npm install 

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]