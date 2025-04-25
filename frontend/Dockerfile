# 빌드 스테이지
FROM node:20-alpine as builder
WORKDIR /app

# 패키지 파일 복사 및 의존성 설치
COPY package*.json ./
RUN if [ ! -f package.json ]; then echo "package.json not found" && exit 1; fi && \
    npm install --production=false

# 소스 코드 복사 및 확인
RUN mkdir -p public src
COPY ./public/. ./public/
COPY ./src/. ./src/
COPY ./vite.config.js ./
COPY ./index.html ./

# 필수 파일 존재 확인
RUN if [ ! -f vite.config.js ]; then echo "vite.config.js not found" && exit 1; fi && \
    if [ ! -f index.html ]; then echo "index.html not found" && exit 1; fi && \
    if [ ! -d src ]; then echo "src directory not found" && exit 1; fi

# 환경 변수 파일 복사 (있는 경우)
COPY ./.env* ./ || true

# 빌드 실행
RUN npm run build

# 프로덕션 스테이지
FROM nginx:alpine

# Nginx 구성 파일 복사
RUN mkdir -p /etc/nginx/conf.d
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf || echo "Using default nginx.conf"
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf || echo "Using default server configuration"

# 빌드된 파일 복사 및 확인
COPY --from=builder /app/dist/ /usr/share/nginx/html/
RUN if [ ! -d /usr/share/nginx/html/assets ]; then echo "Build files not found" && exit 1; fi

# 권한 설정
RUN mkdir -p /var/run && \
    mkdir -p /var/cache/nginx && \
    mkdir -p /var/log/nginx && \
    mkdir -p /var/tmp/nginx && \
    mkdir -p /var/lib/nginx && \
    chown -R nginx:nginx /var/run && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /var/tmp/nginx && \
    chown -R nginx:nginx /var/lib/nginx && \
    chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /var/run && \
    chmod -R 755 /var/cache/nginx && \
    chmod -R 755 /var/log/nginx && \
    chmod -R 755 /var/tmp/nginx && \
    chmod -R 755 /var/lib/nginx && \
    chmod -R 755 /usr/share/nginx/html && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid && \
    chmod 644 /etc/nginx/nginx.conf

USER nginx

EXPOSE 10000

CMD ["nginx", "-g", "daemon off;"] 