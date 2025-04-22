# Render 서버 등록 작업 기록

## 1. 초기 설정 문제점 발견
- Dockerfile 경로 문제
- Nginx 설정 파일 경로 문제
- 환경 변수 충돌 가능성
- 권한 설정 부족

## 2. 수정된 Dockerfile
```dockerfile
# 빌드 스테이지
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 프로덕션 스테이지
FROM nginx:alpine
ENV PORT=${PORT:-10000}

# Nginx 구성 파일 복사
RUN mkdir -p /etc/nginx/conf.d
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

# 권한 설정
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    mkdir -p /var/run && \
    chown -R nginx:nginx /var/run && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid && \
    chmod 644 /etc/nginx/nginx.conf && \
    chmod 644 /etc/nginx/conf.d/default.conf && \
    chown -R nginx:nginx /etc/nginx

USER nginx

EXPOSE ${PORT}

CMD ["nginx", "-g", "daemon off;"]
```

## 3. 수정된 render.yaml
```yaml
services:
  - type: web
    name: weather-frontend
    env: docker
    dockerfilePath: ./frontend/Dockerfile
    dockerCommand: nginx -g "daemon off;"
    envVars:
      - key: PORT
        value: 10000
      - key: VITE_API_URL
        value: https://weather-backend-knii.onrender.com/api
      - key: VITE_ENV
        value: production
      - key: VITE_CACHE_TIME
        value: 3600
      - key: VITE_LOG_LEVEL
        value: info
      - key: VITE_ENABLE_AUTH
        value: true
      - key: VITE_ENABLE_CART
        value: true
      - key: VITE_SITE_NAME
        value: KYSong Store
      - key: VITE_CONTACT_EMAIL
        value: support@kysong.store
    healthCheckPath: /
    autoDeploy: true
```

## 4. 주요 수정사항
1. Dockerfile 경로 수정
   - `WORKDIR /app`로 변경 (frontend 접두사 제거)
   - 파일 복사 경로 수정 (`./nginx/` 접두사 추가)
   - 빌드된 파일 경로 수정 (`/app/build`로 변경)

2. Nginx 설정
   - 설정 파일 경로 수정
   - 권한 설정 강화
   - 환경 변수 처리 개선

3. 환경 변수
   - `PORT` 환경 변수 기본값 설정
   - Vite 관련 환경 변수 추가

4. 권한 설정
   - Nginx 사용자 권한 강화
   - 파일 권한 명시적 설정

## 5. 빌드 순서
1. GitHub 저장소 클론
2. render.yaml 확인
3. Dockerfile 실행
   - 빌더 스테이지: Node.js 빌드
   - 프로덕션 스테이지: Nginx 설정
4. 환경 변수 적용
5. 컨테이너 실행

## 6. 주의사항
- Render에서 제공하는 PORT 환경 변수와의 충돌 방지
- Nginx 설정 파일의 올바른 경로 지정
- 파일 권한 설정의 중요성
- 환경 변수의 적절한 기본값 설정

## 7. 최종 확인사항
1. 프로젝트 구조 확인 완료
2. 실제 파일 경로 확인 완료
3. 환경 변수 사용 여부 확인 완료
4. Nginx 설정 파일 내용 확인 완료
5. Dockerfile 경로 수정 완료

## 2024-04-21 작업 내용

### 1. Docker 빌드 오류 해결
- `npm ci` 명령어 오류 해결
  - `package-lock.json` 파일이 없어서 발생한 오류
  - `npm install`로 변경하여 해결

### 2. Vite 빌드 설정 수정
- `vite.config.js` 수정
  - `base: './'` 추가하여 상대 경로 설정
  - 빌드 출력 디렉토리 설정 (`outDir: 'dist'`)
  - 소스맵 활성화 및 최소화 설정
  - 청크 분할 설정 추가

### 3. 의존성 패키지 추가
- `package.json` 수정
  - `terser` 패키지 추가 (빌드 최소화를 위해)
  - 버전: ^5.27.2

### 4. Dockerfile 최적화
- 빌드 스테이지 개선
  - 파일 복사 순서 최적화
  - 필요한 파일만 명시적으로 복사
  - 권한 설정 추가
- 프로덕션 스테이지 개선
  - Nginx 설정 파일 복사 경로 수정
  - 환경 변수 설정 추가
  - 권한 설정 추가

### 5. 빌드 및 실행 테스트
- Docker 이미지 빌드 성공
- 컨테이너 실행 테스트 완료
- 포트 10000에서 정상 동작 확인

### 6. Render 배포 준비
- Build Command: `docker build -t weather-frontend .`
- Start Command: `docker run -p $PORT:$PORT weather-frontend`

## 2024-04-21 추가 작업 내용

### 7. Nginx 설정 수정
- `nginx.conf` 수정
  - `user nginx;` 지시문 제거 (경고 해결)
  - worker_processes 설정 최적화

- `default.conf` 수정
  - 포트 설정을 정적 값으로 변경 (`listen 10000;`)
  - 환경 변수 처리 방식 개선

- `Dockerfile` 수정
  - PORT 환경 변수 제거
  - EXPOSE 포트를 정적 값으로 변경
  - 권한 설정 최적화

### 8. Render 배포 설정 수정
- `render.yaml` 수정
  - `dockerCommand` 변경: `docker run -p $PORT:10000 weather-frontend`
  - 기존 `nginx -g "daemon off;"` 명령어 제거
  - 환경 변수 설정 유지

## 2024-04-21 추가 작업 내용 2

### 9. Render 서비스 설정 상세
- Docker 설정
  - Dockerfile Path: `/frontend/Dockerfile`
  - Build Context Directory: `/frontend`
  - Docker Command 제거 (Dockerfile의 CMD 사용)

- 빌드 필터 설정
  - Included Paths:
    - `/frontend/*`
    - `/render.yaml`
  - 프론트엔드 관련 파일 변경시에만 자동 배포되도록 설정

- Health Check 설정
  - Path: `/healthz` 추가
  - Nginx 설정 수정 필요

### 10. Nginx 설정 추가
```nginx
# default.conf에 추가
location /healthz {
    access_log off;
    add_header Content-Type text/plain;
    return 200 'OK';
}
```

### 11. render.yaml 업데이트
```yaml
services:
  - type: web
    name: weather-frontend
    env: docker
    dockerfilePath: ./frontend/Dockerfile
    buildFilter:
      paths:
        - frontend/**
        - render.yaml
    healthCheckPath: /healthz
    envVars:
      - key: PORT
        value: 10000
      - key: VITE_API_URL
        value: https://weather-backend-knii.onrender.com/api
      - key: VITE_ENV
        value: production
      - key: VITE_CACHE_TIME
        value: 3600
      - key: VITE_LOG_LEVEL
        value: info
      - key: VITE_ENABLE_AUTH
        value: true
      - key: VITE_ENABLE_CART
        value: true
      - key: VITE_SITE_NAME
        value: KYSong Store
      - key: VITE_CONTACT_EMAIL
        value: support@kysong.store
```

### 12. Render 웹 인터페이스 설정
- 수동 설정 항목
  - Dockerfile Path: `/frontend/Dockerfile` 입력
  - Docker Build Context Directory: `/frontend` 입력
  - Root Directory: 비워두기 (기본값 사용)

- 자동 적용되는 설정 (render.yaml)
  - 환경 변수들
  - Health Check 경로: `/healthz`
  - 빌드 필터: `frontend/**`, `render.yaml`
  - Auto Deploy: 활성화

### 13. 백엔드 연결 설정
- Nginx 프록시 설정 수정
  - 기존: `http://backend:3000`
  - 변경: `https://weather-backend-knii.onrender.com`
  - 이유: Docker 컨테이너 간 직접 통신이 아닌 실제 백엔드 URL로 변경

- 주의사항
  - HTTPS 사용 (보안 연결)
  - CORS 설정 확인 필요
  - 프록시 헤더 설정 유지

### 14. MongoDB 연결 설정
- 경고 메시지 해결
  - `useNewUrlParser`, `useUnifiedTopology` 옵션 관련 경고는 무시 가능
  - MongoDB 드라이버 4.0 이상에서는 자동 적용

- 환경 변수 설정
  - `MONGODB_URI`: MongoDB Atlas 연결 문자열
  - `MONGODB_USERNAME`: MongoDB 사용자 이름
  - `MONGODB_PASSWORD`: MongoDB 비밀번호
  - `JWT_SECRET`: JWT 토큰 암호화 키

- render.yaml 수정
  - 백엔드 서비스 설정 추가
  - MongoDB 환경 변수 설정
  - CORS 설정
  - 로깅 레벨 설정

### 15. 환경 변수 추가 설정
- `NODE_ENV` 환경 변수
  - 프론트엔드와 백엔드 모두 `production` 으로 설정
  - 프로덕션 환경에서의 최적화된 동작을 위해 필요
  - 빌드 프로세스와 런타임 동작에 영향
  - Vite와 React의 최적화 기능 활성화

- 주요 영향
  - 개발 도구 비활성화
  - 에러 메시지 최소화
  - 성능 최적화 활성화
  - 캐싱 전략 최적화

### 16. 백엔드 Render 설정 파일 추가
- `backend/render.yaml` 파일 생성
  - 서비스 이름: `weather-backend`
  - Docker 환경 설정
  - 환경 변수 설정:
    - `NODE_ENV=production`
    - `PORT=3000`
    - MongoDB 연결 정보
    - JWT 설정
    - CORS 설정
    - 로깅 레벨

- 빌드 필터 설정
  - 모든 파일 변경 감지
  - 자동 배포 활성화

- 헬스 체크 설정
  - 경로: `/health`
  - 상태 모니터링

### 17. Nginx PID 파일 권한 설정
- Dockerfile 수정
  - `/var/run` 디렉토리 생성 및 권한 설정
  - 디렉토리 소유권을 nginx 사용자로 변경
  - PID 파일 권한 문제 해결

- 수정된 권한 설정
  ```dockerfile
  mkdir -p /var/run && \
  chown -R nginx:nginx /var/run && \
  touch /var/run/nginx.pid && \
  chown -R nginx:nginx /var/run/nginx.pid
  ```

- 주의사항
  - 컨테이너 재시작시에도 권한 유지
  - nginx 프로세스의 PID 파일 접근 보장
  - 보안상 최소 권한 원칙 준수

### 18. 추가 Nginx 디렉토리 권한 설정
- 추가된 디렉토리 권한 설정
  - `/var/tmp/nginx`: 임시 파일 저장소
  - `/var/lib/nginx`: Nginx 라이브러리 파일
  - `/tmp`: 시스템 임시 파일
  
- 권한 설정 상세
  ```dockerfile
  mkdir -p /var/tmp/nginx && \
  mkdir -p /var/lib/nginx && \
  chown -R nginx:nginx /var/tmp/nginx && \
  chown -R nginx:nginx /var/lib/nginx && \
  chown -R nginx:nginx /tmp && \
  chmod -R 755 /var/lib/nginx && \
  chmod -R 755 /var/tmp/nginx
  ```

- 보안 고려사항
  - 각 디렉토리별 적절한 권한 수준 설정
  - nginx 사용자만 필요한 접근 권한 보유
  - 임시 파일 디렉토리 보안 강화

## 다음 작업 예정
- Render 서버에 배포
- 환경 변수 설정
- 도메인 연결
- SSL 인증서 설정 