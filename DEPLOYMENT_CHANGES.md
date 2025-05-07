# 배포 환경에서 개발 환경으로의 변경사항

## 1. 백엔드 변경사항

### Dockerfile
- 개발 환경용 `Dockerfile.dev` 생성
- 빌드 단계 제거
- 개발 모드로 실행하도록 변경 (`npm run start:dev`)
- 환경 변수 `NODE_ENV=development` 설정

### docker-compose.yml
- `version` 속성 제거 (더 이상 사용되지 않음)
- 볼륨 마운트 추가:
  - `./src:/app/src`
  - `./package.json:/app/package.json`
  - `./tsconfig.json:/app/tsconfig.json`
  - `./nest-cli.json:/app/nest-cli.json`

## 2. 프론트엔드 변경사항

### Dockerfile
- 개발 환경용 `Dockerfile.dev` 생성
- 빌드 단계 제거
- 개발 모드로 실행하도록 변경 (`npm run dev`)
- 환경 변수 설정:
  - `NODE_ENV=development`
  - `VITE_API_URL=http://localhost:10000`
  - `PORT=5173`

### docker-compose.yml
- `version` 속성 제거
- 포트 변경: `3001:3000` → `5173:5173`
- 볼륨 마운트 추가:
  - `./src:/app/src`
  - `./public:/app/public`
  - `./package.json:/app/package.json`
  - `./vite.config.js:/app/vite.config.js`

### vite.config.js
- 서버 포트 변경: `10000` → `5173`
- `host: true` 추가하여 컨테이너 내부 접근 허용

### API 설정
- `process.env` → `import.meta.env` 변경
- 환경 변수 이름 변경: `REACT_APP_API_URL` → `VITE_API_URL`
- API 엔드포인트 구조 변경:
  - `baseURL`에서 `/api` 제거
  - 각 엔드포인트에 `/api` 접두사 추가
  - 예: `/contents` → `/api/contents`

## 3. 주의사항
1. 개발 환경에서는 소스 코드 변경이 실시간으로 반영됩니다.
2. 백엔드는 `http://localhost:10000`에서 실행됩니다.
3. 프론트엔드는 `http://localhost:5173`에서 실행됩니다.
4. 환경 변수는 `docker-compose.yml`에서 관리됩니다.
5. API 엔드포인트는 `baseURL`에 `/api`가 포함되어 있지 않으므로, 각 엔드포인트에서 `/api`를 명시적으로 추가해야 합니다.

# 배포 관련 변경사항

## 2024-03-21: API 연결 및 CORS 설정 최적화

### 백엔드 변경사항
1. CORS 설정 개선
   - 허용된 HTTP 메서드 명시적 추가: GET, POST, PUT, DELETE, OPTIONS
   - 허용된 헤더 명시적 추가: Content-Type, Authorization
   - 환경별 동적 origin 설정 유지

2. CSP 헤더 최적화
   - 개발/프로덕션 환경에 따른 동적 API URL 설정
   - 개발 환경: http://localhost:10000
   - 프로덕션 환경: https://weather-backend-knii.onrender.com

### 프론트엔드 변경사항
1. API URL 설정 개선
   - 환경 변수 기반 동적 URL 설정
   - VITE_API_URL 환경 변수 우선 사용
   - 환경 변수 미설정 시 NODE_ENV에 따른 기본값 사용
     - 개발: http://localhost:10000
     - 프로덕션: https://weather-backend-knii.onrender.com

2. API 엔드포인트 경로 수정
   - 모든 API 엔드포인트에 /api 접두사 추가
   - 중복된 /api 경로 제거로 404 에러 해결

### 영향
- CORS 관련 오류 해결
- 개발/프로덕션 환경 간 전환 용이성 향상
- API 요청 경로 일관성 확보
- 보안 설정 강화 