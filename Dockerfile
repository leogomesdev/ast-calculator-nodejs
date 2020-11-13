FROM node:15.2.0-alpine as build
WORKDIR /app

COPY . /app
RUN npm i --loglevel=error
RUN npm run build

FROM node:15.2.0-alpine
WORKDIR /app

COPY --from=build /app/dist dist

#CMD [ "npm", "start" ]
#EXPOSE 7001