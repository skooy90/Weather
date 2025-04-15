FROM php:8.2-apache

# 필요한 패키지 설치
RUN apt-get update && apt-get install -y \
    libssl-dev \
    pkg-config \
    git \
    unzip

# 프로젝트 파일 복사
COPY . /opt/render/project/src/

# Apache 설정
RUN echo '<VirtualHost *:10000>\n\
    ServerAdmin webmaster@localhost\n\
    DocumentRoot /opt/render/project/src\n\
    <Directory /opt/render/project/src>\n\
        Options Indexes FollowSymLinks\n\
        AllowOverride All\n\
        Require all granted\n\
    </Directory>\n\
    ErrorLog ${APACHE_LOG_DIR}/error.log\n\
    CustomLog ${APACHE_LOG_DIR}/access.log combined\n\
</VirtualHost>' > /etc/apache2/sites-available/000-default.conf

# 포트 설정 변경
RUN sed -i 's/Listen 80/Listen 10000/g' /etc/apache2/ports.conf

# 권한 설정
RUN chown -R www-data:www-data /opt/render/project/src

EXPOSE 10000
