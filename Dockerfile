FROM node:slim as first_layer

WORKDIR /app
COPY . /app

RUN npm install && \
    npm run build

WORKDIR /app/server
RUN npm install && \
    npm run server:build

FROM node:slim as second_layer

WORKDIR /app
COPY --from=first_layer /app/build /app/build
COPY --from=first_layer /app/public /app/public
COPY --from=first_layer /app/server/dist/server/src /app/build/server
COPY --from=first_layer /app/server/node_modules /app/build/server/node_modules

COPY --from=first_layer /app/docker-entrypoint.sh /app/build/docker-entrypoint.sh
COPY --from=first_layer /app/generate_config_js.sh /app/build/generate_config_js.sh

RUN apt-get update && \
    apt-get install dos2unix && \
    apt-get install -y jq && \
    apt-get clean

RUN chmod +rwx /app/build/docker-entrypoint.sh && \
    chmod +rwx /app/build/generate_config_js.sh && \
    dos2unix /app/build/docker-entrypoint.sh && \
    dos2unix /app/build/generate_config_js.sh

EXPOSE 3001
ENV NODE_ENV=production

ENTRYPOINT ["/app/build/docker-entrypoint.sh"]