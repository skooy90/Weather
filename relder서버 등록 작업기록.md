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

## 다음 작업 예정
- Render 서버에 배포
- 환경 변수 설정
- 도메인 연결
- SSL 인증서 설정 