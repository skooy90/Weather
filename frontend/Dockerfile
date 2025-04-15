# 빌드 단계 (Node)
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Apache 단계
FROM httpd:2.4-alpine

# 필요한 모듈 설치
RUN apk add --no-cache apache2-mod-rewrite

# 빌드된 파일 복사
COPY --from=build /app/build/ /usr/local/apache2/htdocs/

# mod_rewrite 활성화
RUN sed -i 's/#LoadModule rewrite_module/LoadModule rewrite_module/' /usr/local/apache2/conf/httpd.conf

# DocumentRoot 및 Directory 설정 수정
RUN sed -i 's#^DocumentRoot ".*"#DocumentRoot "/usr/local/apache2/htdocs"#' /usr/local/apache2/conf/httpd.conf && \
    sed -i '/<Directory "\/usr\/local\/apache2\/htdocs">/,/<\/Directory>/c\<Directory "/usr/local/apache2/htdocs">\n\
    Options Indexes FollowSymLinks\n\
    AllowOverride All\n\
    Require all granted\n\
</Directory>' /usr/local/apache2/conf/httpd.conf

# 포트 노출
EXPOSE 80

# 서버 실행
CMD ["httpd-foreground"] 