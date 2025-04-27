# Node.js 빌드를 위한 이미지
FROM node:20-alpine AS builder

# 필수 패키지 설치 (esbuild 빌드 문제 해결용)
RUN apk add --no-cache libc6-compat imagemagick

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# esbuild 문제 해결: 바이너리 재빌드
RUN npm rebuild esbuild

# npm scripts 실행에 필요한 바이너리 파일에 실행권한 부여
RUN chmod -R +x /app/node_modules/.bin

# favicon 생성 스크립트 실행 권한 부여
RUN chmod +x /app/scripts/generate-favicon.sh

# favicon 생성
RUN ./scripts/generate-favicon.sh

# 빌드 실행
RUN npm run build

# 최종 이미지
FROM nginx:alpine

# nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 빌드된 파일 복사
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/public/favicon.ico /usr/share/nginx/html/
COPY --from=builder /app/public/favicon-*.png /usr/share/nginx/html/
COPY --from=builder /app/public/apple-touch-icon.png /usr/share/nginx/html/
COPY --from=builder /app/public/android-chrome-*.png /usr/share/nginx/html/
COPY --from=builder /app/public/site.webmanifest /usr/share/nginx/html/

# 3000번 포트 노출
EXPOSE 3000

# nginx 실행
CMD ["nginx", "-g", "daemon off;"] 