# KYSong Store

화장품 쇼핑몰 프로젝트입니다.

## 기술 스택

- Frontend: React.js
- Backend: Node.js, Express
- Database: MongoDB
- Container: Docker

## 시작하기

### 환경 설정

1. 환경 변수 파일 생성:
   ```bash
   # 백엔드 환경 변수
   cp backend/.env.example backend/.env
   
   # 프론트엔드 환경 변수
   cp frontend/.env.example frontend/.env
   ```

2. 환경 변수 수정:
   - 백엔드 `.env`: MongoDB URI, JWT Secret 등 설정
   - 프론트엔드 `.env`: API URL 등 설정

### 실행 방법

Docker Compose 사용:
```bash
# 컨테이너 실행
docker compose up --build

# 초기 데이터 생성
docker exec -it weather-backend-1 npm run seed
```

### 접속 정보

- 프론트엔드: http://localhost:3000
- 백엔드 API: http://localhost:8000
- API 문서: http://localhost:8080

## 배포 시 주의사항

1. 환경 변수 설정
   - MongoDB 연결 정보
   - CORS 설정
   - API URL 설정

2. 이미지 파일
   - `/frontend/public/images` 디렉토리에 이미지 파일 복사 필요

3. 데이터베이스
   - 초기 데이터 생성 필요 (npm run seed) 