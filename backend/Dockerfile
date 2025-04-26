# 개발 의존성 설치를 위한 빌드 스테이지
FROM node:18-alpine AS builder

# 기본 도구 설치
RUN apk add --no-cache curl

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일 복사
COPY package*.json ./

# 모든 의존성 설치 (개발 의존성 포함)
RUN npm install

# 소스 코드 복사
COPY . .

# 프로덕션 스테이지
FROM node:18-alpine

# 기본 도구 설치
RUN apk add --no-cache curl

# 작업 디렉토리 설정
WORKDIR /app

# 소스 코드 및 의존성 복사
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/package*.json ./

# 환경 변수 설정
ENV NODE_ENV=production
ENV PORT=10000
ENV MONGODB_URI=mongodb+srv://skooy:Nebuw399XaI8yamb@skyman.r0gqkcz.mongodb.net/weather?retryWrites=true&w=majority&appName=SkyMan

# .env 파일 생성
RUN echo "NODE_ENV=production" > .env && \
    echo "PORT=10000" >> .env && \
    echo "MONGODB_URI=mongodb+srv://skooy:Nebuw399XaI8yamb@skyman.r0gqkcz.mongodb.net/weather?retryWrites=true&w=majority&appName=SkyMan" >> .env

# 데이터베이스 시딩 실행
RUN echo "데이터베이스 시딩을 시작합니다..." && \
    node src/scripts/seedData.js && \
    echo "데이터베이스 시딩이 완료되었습니다."

# 로그 디렉토리 생성 및 권한 설정
RUN mkdir -p /app/logs && \
    chown -R node:node /app && \
    chmod -R 755 /app

# Render의 PORT 환경 변수 사용
EXPOSE ${PORT}

# 사용자 변경
USER node

# 헬스체크 설정
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:${PORT}/health || exit 1

# 앱 실행
CMD ["npm", "start"] 