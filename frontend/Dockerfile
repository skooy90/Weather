# 빌드 단계
FROM node:18-alpine as build

WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사 및 빌드
COPY . .
RUN npm run build

# Apache 단계
FROM httpd:2.4-alpine

# mod_rewrite 모듈 활성화
RUN sed -i 's/#LoadModule rewrite_module/LoadModule rewrite_module/' /usr/local/apache2/conf/httpd.conf

# Listen 포트 변경
RUN sed -i 's/Listen 80/Listen 10000/' /usr/local/apache2/conf/httpd.conf

# 디렉토리 생성
RUN mkdir -p /var/www/html/frontend/src/pages

# 빌드된 파일 복사
COPY --from=build /app/build/ /var/www/html/frontend/src/pages/

# VirtualHost 설정
RUN echo '<VirtualHost *:10000>\n\
    ServerAdmin webmaster@localhost\n\
    DocumentRoot "/var/www/html/frontend/src/pages"\n\
    <Directory "/var/www/html/frontend/src/pages">\n\
        Options Indexes FollowSymLinks\n\
        AllowOverride All\n\
        Require all granted\n\
        AddType application/javascript .js\n\
        AddType text/javascript .jsx\n\
        AddType text/css .css\n\
        # 캐싱 설정\n\
        <FilesMatch "\.(js|css|jpg|jpeg|png|gif|ico)$">\n\
            Header set Cache-Control "max-age=31536000, public"\n\
        </FilesMatch>\n\
    </Directory>\n\
    ErrorLog /proc/self/fd/2\n\
    CustomLog /proc/self/fd/1 combined\n\
</VirtualHost>' > /usr/local/apache2/conf/extra/httpd-vhosts.conf

# VirtualHost 설정 활성화
RUN sed -i 's/#Include conf\/extra\/httpd-vhosts.conf/Include conf\/extra\/httpd-vhosts.conf/' /usr/local/apache2/conf/httpd.conf

# DocumentRoot 변경
RUN sed -i 's#^DocumentRoot.*#DocumentRoot "/var/www/html/frontend/src/pages"#' /usr/local/apache2/conf/httpd.conf

# .htaccess 파일 생성
RUN echo 'RewriteEngine On\n\
RewriteBase /\n\
RewriteRule ^index\.html$ - [L]\n\
RewriteCond %{REQUEST_FILENAME} !-f\n\
RewriteCond %{REQUEST_FILENAME} !-d\n\
RewriteRule . /index.html [L]' > /var/www/html/frontend/src/pages/.htaccess

EXPOSE 10000

CMD ["httpd-foreground"] 