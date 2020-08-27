from node:14

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

RUN npm install pm2 -g

COPY ./dist .

CMD ["pm2-runtime","server.js"]