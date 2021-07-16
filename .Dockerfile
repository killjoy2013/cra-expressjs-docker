FROM artifactory.turkcell.com.tr/local-docker-3rd-party/com/turkcell/noderunner/node:14.17-slim AS client_build
WORKDIR /tmp          
COPY . /tmp/

RUN npm install --registry https://artifactory.turkcell.com.tr/artifactory/api/npm/npm/ && \
    npm run build

FROM artifactory.turkcell.com.tr/local-docker-3rd-party/com/turkcell/noderunner/node_14_17_slim_dos2unix_jq:001 AS server_build

WORKDIR /tmp          
COPY --from=client_build /tmp/build /tmp/build
COPY --from=client_build /tmp/public /tmp/public
COPY --from=client_build /tmp/server /tmp/server
COPY --from=client_build /tmp/src /tmp/src
COPY --from=client_build /tmp/docker-entrypoint.sh /tmp/docker-entrypoint.sh
COPY --from=client_build /tmp/generate_config_js.sh /tmp/generate_config_js.sh

WORKDIR /tmp/server  

RUN npm install --registry https://artifactory.turkcell.com.tr/artifactory/api/npm/npm/
RUN npm run server:build

WORKDIR /tmp          

RUN chmod +rwx /tmp/generate_config_js.sh && \              
    chmod +rwx /tmp/docker-entrypoint.sh && \              
    chmod +rwx /tmp/server/certs/cert.key && \
    chmod +rwx /tmp/server/certs/cert.pem && \
    dos2unix /tmp/generate_config_js.sh && \                            
    dos2unix /tmp/docker-entrypoint.sh   

RUN mv /tmp/server/dist/src /tmp/build/server && \    
    mv /tmp/server/node_modules /tmp/build/server/ && \
    mv /tmp/server/certs /tmp/build/ && \
    mv /tmp/docker-entrypoint.sh /tmp/build/docker-entrypoint.sh && \
    mv /tmp/generate_config_js.sh /tmp/build/generate_config_js.sh  && \ 
    chmod -R 777 /tmp/build  

ENV PATH /tmp/build/bff/node_modules/.bin:$PATH   

EXPOSE 8081
USER expressjs         
ENTRYPOINT ["/tmp/build/docker-entrypoint.sh"]


