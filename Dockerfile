FROM node:slim as node-builder
RUN apt-get update && apt-get install -y dos2unix
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app

RUN npm run build && \
    npm run server:build && \
    mv /app/server/dist/src /app/build/server 

EXPOSE 3001
ENV NODE_ENV=production

CMD [ "node","/app/build/server" ]