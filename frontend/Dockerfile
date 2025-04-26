# 빌드 스테이지
FROM node:20-alpine as builder
WORKDIR /app

# 패키지 파일 복사 및 의존성 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# 환경 변수 설정
ENV NODE_ENV=production
ENV VITE_API_URL=${API_URL:-https://weather-backend-knii.onrender.com}

# 빌드 실행
RUN npm run build

# 프로덕션 스테이지
FROM nginx:alpine

# Nginx 구성 파일 복사
RUN mkdir -p /etc/nginx/conf.d
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Render 환경 변수 처리
RUN sed -i "s/listen 10000/listen ${PORT:-10000}/g" /etc/nginx/conf.d/default.conf && \
    sed -i "s|proxy_pass https://weather-backend-knii.onrender.com|proxy_pass ${API_URL:-https://weather-backend-knii.onrender.com}|g" /etc/nginx/conf.d/default.conf

# 빌드된 파일 복사
COPY --from=builder /app/dist /usr/share/nginx/html

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
    chown nginx:nginx /var/run/nginx.pid && \
    chmod 666 /var/run/nginx.pid && \
    chmod 644 /etc/nginx/nginx.conf && \
    chmod 644 /etc/nginx/conf.d/default.conf

# Nginx 사용자로 전환
USER nginx

# Render의 PORT 환경 변수 사용
ENV PORT=10000
EXPOSE ${PORT}

CMD ["sh", "-c", "nginx -g 'daemon off;'"] 