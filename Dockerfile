FROM node:slim as client_build

WORKDIR /app
COPY . /app

RUN npm install && \
    npm run build

WORKDIR /app/server
RUN npm install && \
    npm run server:build

FROM node:slim as server_build

WORKDIR /app
COPY --from=client_build /app/build /app/build
COPY --from=client_build /app/public /app/public
COPY --from=client_build /app/server/dist/server/src /app/build/server
COPY --from=client_build /app/server/node_modules /app/build/server/node_modules

COPY --from=client_build /app/docker-entrypoint.sh /app/build/docker-entrypoint.sh
COPY --from=client_build /app/generate_config_js.sh /app/build/generate_config_js.sh

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