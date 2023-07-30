FROM node:18-alpine

WORKDIR /usr/app
COPY . /usr/app

RUN npm install
RUN npm run build

CMD sh /usr/app/.docker/startup.sh
