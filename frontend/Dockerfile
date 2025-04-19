# 빌드 스테이지
FROM node:18-alpine as build

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일만 먼저 복사
COPY package*.json ./

# 의존성 설치 전 캐시 정리 및 설치
RUN npm cache clean --force && \
    npm install

# 소스 코드 복사
COPY . .

# 환경 변수 설정
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL:-https://weather-backend-knii.onrender.com/api}
ENV NODE_ENV=production

# 빌드 실행
RUN npm run build

# 프로덕션 스테이지
FROM nginx:alpine

# nginx 기본 설정
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 보안 설정
RUN rm -rf /etc/nginx/conf.d/default.conf && \
    echo "server_tokens off;" >> /etc/nginx/conf.d/security.conf

# 빌드 결과물 복사
COPY --from=build /app/dist /usr/share/nginx/html

# 권한 설정
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# 포트 설정
EXPOSE 80

# nginx 실행
CMD ["nginx", "-g", "daemon off;"] 