FROM php:8.2-apache

# 시스템 패키지 설치
RUN apt-get update && apt-get install -y \
    libssl-dev \
    pkg-config \
    git \
    unzip \
    default-mysql-client \
    openjdk-17-jdk \
    curl \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

# Node.js 설치
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest

# PHP 확장 설치
RUN docker-php-ext-install pdo pdo_mysql mysqli

# MongoDB 확장 설치
RUN pecl install mongodb \
    && docker-php-ext-enable mongodb

# Composer 설치
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 프로젝트 복사
COPY . /var/www/html/

# 권한 설정
RUN chown -R www-data:www-data /var/www/html

# Apache 설정
RUN a2enmod rewrite

# 작업 디렉토리 설정
WORKDIR /var/www/html
