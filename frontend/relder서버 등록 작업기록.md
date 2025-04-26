# Render 서버 등록 작업 기록

## 1. 초기 환경 설정
### 1.1 프로젝트 구조
- 프론트엔드: React + Vite
  - React: 사용자 인터페이스 구축을 위한 JavaScript 라이브러리
  - Vite: 빠른 개발 환경과 최적화된 빌드를 위한 빌드 도구
- 백엔드: Node.js + Express
  - Node.js: 서버 사이드 JavaScript 런타임
  - Express: 웹 애플리케이션 프레임워크
- 데이터베이스: MongoDB Atlas
  - 클라우드 기반 NoSQL 데이터베이스 서비스
  - 자동 확장성과 고가용성 제공

### 1.2 Docker 설정
```dockerfile
# 빌드 스테이지
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY public ./public
COPY src ./src
COPY vite.config.js ./
COPY index.html ./
RUN npm run build

# 프로덕션 스테이지
FROM nginx:alpine

# Nginx 구성 파일 복사
RUN mkdir -p /etc/nginx/conf.d
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

# 권한 설정
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    mkdir -p /var/run && \
    mkdir -p /var/tmp/nginx && \
    mkdir -p /var/lib/nginx && \
    chown -R nginx:nginx /var/run && \
    chown -R nginx:nginx /var/tmp/nginx && \
    chown -R nginx:nginx /var/lib/nginx && \
    chown -R nginx:nginx /tmp && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid && \
    chmod 644 /etc/nginx/nginx.conf && \
    chmod 644 /etc/nginx/conf.d/default.conf && \
    chmod -R 755 /var/lib/nginx && \
    chmod -R 755 /var/tmp/nginx && \
    chown -R nginx:nginx /etc/nginx

USER nginx
EXPOSE 10000
CMD ["nginx", "-g", "daemon off;"]
```

## 2. Nginx 설정
### 2.1 기본 설정
```nginx
# nginx.conf
worker_processes auto;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # 로그 포맷 설정
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;
    error_log /var/log/nginx/error.log warn;

    # 기본 설정
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;

    # GZIP 설정
    gzip on;
    gzip_disable "msie6";
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    include /etc/nginx/conf.d/*.conf;
}

# default.conf
server {
    listen 10000;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html;

    # 보안 헤더 설정
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    add_header Content-Security-Policy "default-src 'self' https: http: data: blob: 'unsafe-inline'";

    # Health Check
    location /healthz {
        access_log off;
        add_header Content-Type text/plain;
        return 200 'OK';
    }

    location / {
        try_files $uri $uri/ /index.html;
        expires -1;
    }

    location /static {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }

    # API 프록시 설정
    location /api {
        proxy_pass https://weather-backend-knii.onrender.com;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # 에러 페이지
    error_page 404 /index.html;
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

## 3. 데이터베이스 설정
### 3.1 MongoDB Atlas 설정
- 클러스터 생성
  - M0 무료 티어 사용
  - 자동 백업 활성화
- 데이터베이스 생성: `weather`
  - 컬렉션 자동 생성 설정
- 사용자 생성 및 권한 설정
  - Read and write to any database 권한 부여
  - 비밀번호 정책 준수
- 네트워크 액세스 설정: `0.0.0.0/0`
  - 모든 IP에서 접근 허용
  - 보안 그룹 설정

### 3.2 데이터베이스 모델
```javascript
// Product 모델
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
  stock: Number,
  status: String
});

// User 모델
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  role: String
});

// Cart 모델
const cartSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  items: [{
    productId: mongoose.Schema.Types.ObjectId,
    quantity: Number
  }]
});
```

## 4. Render 배포 설정
### 4.1 render.yaml 설정
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
    autoDeploy: true

  - type: web
    name: weather-backend
    env: docker
    dockerfilePath: ./backend/Dockerfile
    buildFilter:
      paths:
        - backend/**
        - render.yaml
    healthCheckPath: /api/health
    envVars:
      - key: PORT
        value: 3000
      - key: NODE_ENV
        value: production
      - key: MONGODB_URI
        value: mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.mongodb.net/weather?retryWrites=true&w=majority
      - key: JWT_SECRET
        sync: false
      - key: CORS_ORIGIN
        value: https://weather-of7u.onrender.com
      - key: LOG_LEVEL
        value: info
    autoDeploy: true
```

### 4.2 환경 변수 설정
- 프론트엔드 환경 변수
  - `PORT`: 서버 포트 (10000)
  - `VITE_API_URL`: 백엔드 API URL
  - `VITE_ENV`: 실행 환경 (production)
  - `VITE_CACHE_TIME`: 캐시 시간 (3600초)
  - `VITE_LOG_LEVEL`: 로그 레벨 (info)
  - `VITE_ENABLE_AUTH`: 인증 기능 활성화
  - `VITE_ENABLE_CART`: 장바구니 기능 활성화
  - `VITE_SITE_NAME`: 사이트 이름
  - `VITE_CONTACT_EMAIL`: 연락처 이메일

- 백엔드 환경 변수
  - `PORT`: 서버 포트 (3000)
  - `NODE_ENV`: 실행 환경 (production)
  - `MONGODB_URI`: MongoDB 연결 문자열
  - `JWT_SECRET`: JWT 토큰 암호화 키
  - `CORS_ORIGIN`: 프론트엔드 도메인
  - `LOG_LEVEL`: 로그 레벨 (info)

## 5. API 구조
### 5.1 엔드포인트 구성
- `/api/weather`: 날씨 정보 API
  - 날씨 데이터 조회
  - 위치 기반 검색
- `/api/auth`: 인증 관련 API
  - 로그인/회원가입
  - 토큰 관리
- `/api/products`: 상품 관리 API
  - CRUD 작업
  - 검색/필터링
- `/api/product-details`: 상품 상세 정보 API
  - 상세 정보 조회
  - 리뷰 관리
- `/api/cart`: 장바구니 API
  - 장바구니 관리
  - 결제 처리
- `/api/users`: 사용자 관리 API
  - 프로필 관리
  - 권한 관리

### 5.2 Swagger 설정
- UI 경로: `/api-docs`
  - API 문서화
  - 테스트 인터페이스
- JSON 경로: `/api-docs/swagger.json`
  - API 스키마 정의
- 보안 설정: Bearer 토큰 인증
  - API 보안
  - 인증 테스트

## 6. 주요 문제 해결
### 6.1 Nginx 권한 문제
- PID 파일 권한 설정
  - 프로세스 관리
  - 권한 오류 해결
- 로그 디렉토리 권한 설정
  - 로그 기록
  - 접근 제어
- 정적 파일 권한 설정
  - 파일 서빙
  - 보안 강화

### 6.2 MongoDB 연결 문제
- 연결 문자열 형식 확인
  - 올바른 형식 검증
  - 오류 방지
- 데이터베이스 이름 포함
  - 연결 대상 지정
  - 스키마 관리
- 인증 정보 일치 확인
  - 보안 검증
  - 접근 제어
- 사용자 권한 설정
  - 작업 범위 정의
  - 보안 강화

## 다음 작업 예정
- API 엔드포인트 구현
  - RESTful API 설계
  - 에러 처리
- 프론트엔드 UI 개발
  - 반응형 디자인
  - 사용자 경험 개선
- 사용자 인증 구현
  - JWT 기반 인증
  - 세션 관리
- 상품 관리 기능 구현
  - CRUD 작업
  - 검색 기능
- 장바구니 기능 구현
  - 상태 관리
  - 결제 통합 