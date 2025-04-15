# 빌드 단계 (Node)
FROM node:18-alpine as build

WORKDIR /app

# package.json 복사 및 의존성 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# 빌드 실행
RUN npm run build

# 빌드 결과물 검증
RUN cd /app/build && \
    echo "=== Build Directory Contents ===" && \
    ls -la && \
    echo "=== Checking index.html ===" && \
    cat index.html && \
    echo "=== Checking static/js directory ===" && \
    ls -la static/js && \
    echo "=== Checking static/css directory ===" && \
    ls -la static/css && \
    echo "=== Checking for required files ===" && \
    test -f index.html && echo "✓ index.html exists" && \
    test -d static/js && echo "✓ static/js directory exists" && \
    test -d static/css && echo "✓ static/css directory exists"

# Apache 단계
FROM httpd:2.4-alpine

# 필요한 모듈 설치
RUN apk add --no-cache apache2-mod-rewrite

# VirtualHost 설정 파일 생성
RUN echo '<VirtualHost *:80>\n\
    ServerAdmin webmaster@localhost\n\
    DocumentRoot /usr/local/apache2/htdocs\n\
    <Directory /usr/local/apache2/htdocs>\n\
        Options -Indexes +FollowSymLinks\n\
        AllowOverride All\n\
        Require all granted\n\
        AddType application/javascript .js\n\
        AddType text/javascript .jsx\n\
        AddType text/css .css\n\
        DirectoryIndex index.html\n\
    </Directory>\n\
    <FilesMatch "\\.(js|jsx|css|json)$">\n\
        Header set Cache-Control "no-cache"\n\
        Header set Access-Control-Allow-Origin "*"\n\
    </FilesMatch>\n\
</VirtualHost>' > /usr/local/apache2/conf/extra/httpd-vhosts.conf

# 기본 설정 수정
RUN sed -i \
    -e 's/^#\(LoadModule rewrite_module modules\/mod_rewrite.so\)/\1/' \
    -e 's/^#\(LoadModule headers_module modules\/mod_headers.so\)/\1/' \
    -e 's/^#\(LoadModule mime_module modules\/mod_mime.so\)/\1/' \
    -e 's/^#\(Include conf\/extra\/httpd-vhosts.conf\)/\1/' \
    /usr/local/apache2/conf/httpd.conf

# 빌드된 파일 복사
COPY --from=build /app/build/ /usr/local/apache2/htdocs/

# .htaccess 파일 생성
RUN echo 'RewriteEngine On\n\
RewriteBase /\n\
RewriteRule ^index\.html$ - [L]\n\
RewriteCond %{REQUEST_FILENAME} !-f\n\
RewriteCond %{REQUEST_FILENAME} !-d\n\
RewriteCond %{REQUEST_FILENAME} !-l\n\
RewriteRule . /index.html [L]\n\
\n\
# MIME 타입 설정\n\
AddType application/javascript .js\n\
AddType text/javascript .jsx\n\
AddType text/css .css\n\
\n\
# 캐시 제어\n\
<FilesMatch "\\.(js|jsx|css|json)$">\n\
    Header set Cache-Control "no-cache"\n\
    Header set Access-Control-Allow-Origin "*"\n\
</FilesMatch>' > /usr/local/apache2/htdocs/.htaccess

# 설정 검증
RUN echo "=== Checking Apache Modules ===" && \
    httpd -M | grep -E 'rewrite|headers|mime' && \
    echo "=== Checking VirtualHost Configuration ===" && \
    httpd -S && \
    echo "=== Checking .htaccess ===" && \
    cat /usr/local/apache2/htdocs/.htaccess && \
    echo "=== Checking htdocs Contents ===" && \
    ls -la /usr/local/apache2/htdocs/ && \
    echo "=== Checking File Permissions ===" && \
    ls -l /usr/local/apache2/htdocs/ | grep "^-" | awk '{print $1}' | sort | uniq -c && \
    echo "=== Checking MIME Types ===" && \
    grep -r "AddType" /usr/local/apache2/conf/ && \
    echo "=== Checking Directory Structure ===" && \
    find /usr/local/apache2/htdocs -type d -ls

# 포트 노출
EXPOSE 80

# 서버 실행
CMD ["httpd-foreground"] 