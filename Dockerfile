# Node.js 서버 실행을 위한 이미지
FROM node:20-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# 빌드 실행
RUN npm run build -- --mode production

# 포트 노출 (Render의 PORT 환경 변수 사용)
EXPOSE ${PORT:-3000}

# Node.js 서버 실행
CMD ["node", "server.js"] 