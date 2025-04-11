FROM php:8.2-apache

# MongoDB 확장 설치 (나중에 DB 연결할 때 필요)
RUN apt-get update && apt-get install -y libssl-dev pkg-config git unzip \
    && pecl install mongodb \
    && docker-php-ext-enable mongodb

# Composer 설치
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 프로젝트 복사
COPY . /var/www/html/

# 권한 설정
RUN chown -R www-data:www-data /var/www/html
