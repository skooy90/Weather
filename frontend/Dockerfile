# Node.js 빌드를 위한 이미지
FROM node:20-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일 복사
COPY package*.json ./

# 사용자 설정
USER root

# 의존성 설치 및 권한 설정
RUN npm install && \
    chmod -R 755 /app/node_modules/.bin

# 소스 코드 복사
COPY . .

# 빌드 실행
RUN npm run build

# 최종 이미지
FROM nginx:alpine

# 빌드된 파일 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# nginx 설정 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 80번 포트 노출
EXPOSE 80

# nginx 실행
CMD ["nginx", "-g", "daemon off;"] 