FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM httpd:2.4-alpine

RUN mkdir -p /usr/local/apache2/htdocs/src/public

COPY --from=build /app/build/* /usr/local/apache2/htdocs/src/public/

COPY httpd.conf /usr/local/apache2/conf/httpd.conf

EXPOSE 80

CMD ["httpd-foreground"] 