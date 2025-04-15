FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM httpd:2.4-alpine

# 기본 경로 생성
RUN mkdir -p /var/www/html/frontend/src/pages

# 빌드된 파일 복사
COPY --from=build /app/build/* /var/www/html/frontend/src/pages/

# Apache 설정 파일 복사
COPY httpd.conf /usr/local/apache2/conf/httpd.conf

# Apache 포트 설정
RUN sed -i 's/Listen 80/Listen 10000/g' /usr/local/apache2/conf/httpd.conf

# DocumentRoot 설정
RUN sed -i 's#^DocumentRoot.*#DocumentRoot "/var/www/html/frontend/src/pages"#' /usr/local/apache2/conf/httpd.conf
RUN sed -i 's#<Directory "/usr/local/apache2/htdocs">#<Directory "/var/www/html/frontend/src/pages">#' /usr/local/apache2/conf/httpd.conf

EXPOSE 10000

CMD ["httpd-foreground"] 