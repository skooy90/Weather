# 개발 의존성 설치를 위한 빌드 스테이지
FROM node:18-alpine as builder

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

# 패키지 파일 복사
COPY package*.json ./

# 프로덕션 의존성만 설치
RUN npm install --omit=dev

# 빌더에서 필요한 파일만 복사
COPY --from=builder /app/src ./src

# 로그 디렉토리 생성 및 권한 설정
RUN mkdir -p /app/logs && \
    chown -R node:node /app && \
    chmod -R 755 /app

# 포트 설정
EXPOSE 3000

# 사용자 변경
USER node

# 헬스체크 설정
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# 앱 실행
CMD ["node", "src/index.js"] 