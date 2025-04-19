# 빌드 단계
FROM node:18-alpine as build

WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# 환경 변수 설정
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# 프로덕션 빌드
RUN npm run build

# 실행 단계
FROM nginx:alpine

# nginx 기본 설정 파일 삭제
RUN rm -rf /etc/nginx/conf.d/*

# 빌드된 파일을 nginx 디렉토리로 복사
COPY --from=build /app/dist /usr/share/nginx/html

# nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 보안 헤더 설정
RUN echo "server_tokens off;" > /etc/nginx/conf.d/security.conf

# nginx 로그 디렉토리 생성
RUN mkdir -p /var/log/nginx

# 권한 설정
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 