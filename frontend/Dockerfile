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

# 빌드 결과물 확인
RUN ls -la /app/build/ && echo "Build directory contents:"

# Apache 단계
FROM httpd:2.4-alpine

# 필요한 모듈 설치
RUN apk add --no-cache apache2-mod-rewrite

# 기본 디렉토리 생성
RUN mkdir -p /usr/local/apache2/htdocs

# 빌드된 파일 복사
COPY --from=build /app/build/ /usr/local/apache2/htdocs/

# 복사된 파일 확인
RUN ls -la /usr/local/apache2/htdocs/ && echo "Apache htdocs contents:"

# mod_rewrite 활성화
RUN sed -i 's/#LoadModule rewrite_module/LoadModule rewrite_module/' /usr/local/apache2/conf/httpd.conf

# DocumentRoot 및 Directory 설정 수정
RUN sed -i 's#^DocumentRoot ".*"#DocumentRoot "/usr/local/apache2/htdocs"#' /usr/local/apache2/conf/httpd.conf && \
    sed -i '/<Directory "\/usr\/local\/apache2\/htdocs">/,/<\/Directory>/c\<Directory "/usr/local/apache2/htdocs">\n\
    Options -Indexes +FollowSymLinks\n\
    AllowOverride All\n\
    Require all granted\n\
    DirectoryIndex index.html\n\
</Directory>' /usr/local/apache2/conf/httpd.conf

# .htaccess 파일 생성
RUN echo 'RewriteEngine On\n\
RewriteBase /\n\
RewriteRule ^index\.html$ - [L]\n\
RewriteCond %{REQUEST_FILENAME} !-f\n\
RewriteCond %{REQUEST_FILENAME} !-d\n\
RewriteCond %{REQUEST_FILENAME} !-l\n\
RewriteRule . /index.html [L]' > /usr/local/apache2/htdocs/.htaccess

# Apache 설정 확인
RUN httpd -t

# 포트 노출
EXPOSE 80

# 서버 실행
CMD ["httpd-foreground"] 