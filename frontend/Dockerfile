FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM httpd:2.4-alpine

# Render 서버의 기본 경로 생성
RUN mkdir -p /opt/render/project/src

# 빌드된 파일 복사
COPY --from=build /app/build/* /opt/render/project/src/

# Apache 설정 파일 복사
COPY httpd.conf /usr/local/apache2/conf/httpd.conf

# Apache 포트 설정
RUN sed -i 's/Listen 80/Listen 10000/g' /usr/local/apache2/conf/httpd.conf

# DocumentRoot 설정
RUN sed -i 's#^DocumentRoot.*#DocumentRoot "/opt/render/project/src"#' /usr/local/apache2/conf/httpd.conf
RUN sed -i 's#<Directory "/usr/local/apache2/htdocs">#<Directory "/opt/render/project/src">#' /usr/local/apache2/conf/httpd.conf

EXPOSE 10000

CMD ["httpd-foreground"] 