# Build image (This is done to not have the ssh keys on the final image)
FROM node:18 AS build

WORKDIR /app/src

ENV NODE_ENV=development 
ENV APP_STAGE=docker

COPY . .

#RUN mkdir ~/.ssh/
#RUN cat .ssh/config > ~/.ssh/config
#RUN cat .ssh/services > ~/.ssh/services
#RUN cat .ssh/services.public.pub > ~/.ssh/services.public.pub
#RUN cat .ssh/services.public.pub > ~/.ssh/authorized_keys
#RUN chmod 600 ~/.ssh/services

RUN npm install
RUN npm run build

# Runner image
FROM node:18 AS run

WORKDIR /app/src

COPY --from=build /app/src/dist ./dist
COPY --from=build /app/src/public ./public
COPY --from=build /app/src/node_modules ./node_modules
COPY --from=build /app/src/package.json .

ENV NODE_ENV=development
#ENV APP_STAGE={crear en docker compose o deployment.yml}
ENV PORT=3001
ENV REST_ROUTE_PREFIX="/api/"
#mongoDB
ENV MONGO_DB_URL="mongodb://mongodatabase"
ENV MONGO_DB_PORT="27017"
ENV SERVICE_DB_NAME="service_test"
#mongoDB config
ENV LOCAL_USE_URL_PARSE=true
ENV LOCAL_USE_UNIFIED_TOPOLOGY=true
ENV LOCAL_RETRY_WRITES=false
ENV DEV_SSL=false
ENV DEV_SSL_VALIDATE=false
ENV DIRECT_CONNECTION=false
ENV AUTH_SOURCE="admin"
#Sequelize Config
ENV SEQUELIZE_HOST = "localhost"
ENV SEQUELIZE_DB_NAME = "service_test"
ENV SEQUELIZE_USER = "root"
ENV SEQUELIZE_DRIVE = "mysql"
ENV SEQUELIZE_PASSWORD = ""

EXPOSE 3001

ENTRYPOINT [ "npm", "run", "build" ]