# 베이스 이미지
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# TypeScript 컴파일
RUN npm run build

# 로그 디렉토리 생성
RUN mkdir -p /app/logs

# 포트 설정
EXPOSE 10000

# 헬스체크 설정
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:10000/health || exit 1

# 앱 실행
CMD ["node", "dist/main"] 