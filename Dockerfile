FROM node:slim as node-builder

WORKDIR /app
COPY package.json /app/package.json

RUN npm install
COPY . /app

RUN apt-get update && \
    apt-get install dos2unix && \
    apt-get install -y jq && \
    apt-get clean

RUN chmod +rwx /app/docker-entrypoint.sh && \
    chmod +rwx /app/generate_config_js.sh && \
    dos2unix /app/docker-entrypoint.sh && \
    dos2unix /app/generate_config_js.sh

RUN npm run build && \
    npm run server:build && \
    mv /app/server/dist/src /app/build/server && \
    mv /app/docker-entrypoint.sh /app/build/docker-entrypoint.sh && \
    mv /app/generate_config_js.sh /app/build/generate_config_js.sh

EXPOSE 3001
ENV NODE_ENV=production

ENTRYPOINT ["/app/build/docker-entrypoint.sh"]