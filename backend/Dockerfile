# 개발 의존성 설치를 위한 빌드 스테이지
FROM node:18-alpine as builder

# 기본 도구 설치
RUN apk add --no-cache curl

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일만 먼저 복사
COPY package*.json ./

# 모든 의존성 설치 (개발 의존성 포함)
RUN npm ci

# 소스 코드 복사
COPY . .

# 테스트 실행 (필요한 경우)
RUN npm test

# 프로덕션 스테이지
FROM node:18-alpine

# 기본 도구 설치
RUN apk add --no-cache curl

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일 복사
COPY package*.json ./

# 프로덕션 의존성만 설치
RUN npm ci --only=production

# 필요한 파일만 복사
COPY --from=builder /app/src ./src
COPY --from=builder /app/config ./config

# 환경 변수 설정
ENV NODE_ENV=production \
    PORT=3000

# 로그 디렉토리 생성 및 권한 설정
RUN mkdir -p /app/logs && \
    chown -R node:node /app && \
    touch /app/logs/health.log && \
    chown node:node /app/logs/health.log

# 보안을 위한 사용자 전환
USER node

# 포트 노출
EXPOSE 3000

# 헬스체크
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

# 애플리케이션 실행
CMD ["npm", "start"] 