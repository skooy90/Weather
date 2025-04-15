FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM httpd:2.4-alpine

RUN mkdir -p /opt/render/project/src

COPY --from=build /app/build/* /opt/render/project/src/

COPY httpd.conf /usr/local/apache2/conf/httpd.conf

RUN sed -i 's/Listen 80/Listen 10000/g' /usr/local/apache2/conf/httpd.conf

EXPOSE 10000

CMD ["httpd-foreground"] 