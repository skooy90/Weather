# User 모델 구현 문서

## 1. 모델 개요
- **파일 위치**: `backend/src/models/User.js`
- **목적**: 사용자 인증 및 프로필 관리를 위한 MongoDB 스키마
- **최종 수정일**: 2024-04-24
- **버전**: 1.0.0

## 2. 스키마 구조

### 2.1 기본 식별 정보
- `userId`: 사용자 고유 식별자 (String)
  - 필수 필드, 고유값
  - 인덱스 적용
  - 공백 제거 (trim)

- `username`: 사용자 로그인 ID (String)
  - 필수 필드, 고유값
  - 최소 3자 이상
  - 인덱스 적용
  - 공백 제거

- `email`: 사용자 이메일 (String)
  - 필수 필드, 고유값
  - 소문자 변환
  - 인덱스 적용
  - 공백 제거

- `password`: 암호화된 비밀번호 (String)
  - 필수 필드
  - 최소 8자 이상
  - 기본 조회에서 제외 (select: false)
  - bcrypt로 암호화

### 2.2 권한 및 상태
- `role`: 사용자 권한 (String)
  - enum: ['user', 'admin']
  - 기본값: 'user'
  - 인덱스 적용

- `status`: 계정 상태 (String)
  - enum: ['active', 'inactive', 'suspended']
  - 기본값: 'active'
  - 인덱스 적용

### 2.3 프로필 정보
- `profile.name`: 사용자 표시 이름 (String)
  - 공백 제거

- `profile.bio`: 자기소개 (String)
  - 공백 제거

- `profile.avatar`: 프로필 이미지 URL (String)
  - 공백 제거

- `profile.language`: 사용자 선호 언어 (String)
  - enum: ['ko', 'en', 'ja']
  - 기본값: 'ko'

### 2.4 환경 설정
- `preferences.theme`: 테마 설정 (String)
  - enum: ['light', 'dark']
  - 기본값: 'light'

- `preferences.notifications`: 알림 설정
  - `email`: 이메일 알림 (Boolean)
    - 기본값: true
  - `push`: 푸시 알림 (Boolean)
    - 기본값: true

### 2.5 보안 관련
- `lastLogin`: 마지막 로그인 시간 (Date)
  - 기본값: null

- `loginAttempts`: 로그인 시도 횟수 (Number)
  - 기본값: 0

- `lockUntil`: 계정 잠금 해제 시간 (Date)
  - 기본값: null

## 3. 메서드

### 3.1 비밀번호 관련
- `pre('save')`: 비밀번호 해싱 미들웨어
  - 비밀번호 변경 시 자동 해싱
  - bcrypt 사용 (salt: 10)

- `comparePassword()`: 비밀번호 검증
  - 입력된 비밀번호와 저장된 해시 비교
  - Promise<boolean> 반환

### 3.2 계정 잠금 관련
- `incrementLoginAttempts()`: 로그인 시도 횟수 증가
  - 5회 이상 실패 시 30분 동안 계정 잠금

- `resetLoginAttempts()`: 계정 잠금 해제
  - 로그인 성공 시 호출

- `isLocked()`: 계정 잠금 상태 확인
  - boolean 반환

## 4. 보안 기능
- 비밀번호 필드 기본 조회 제외
- JSON 변환 시 민감 정보 제거
  - password
  - loginAttempts
  - lockUntil
- 계정 잠금 메커니즘
  - 5회 실패 시 30분 잠금
- 비밀번호 해싱 (bcrypt)

## 5. 성능 최적화
- 자주 조회되는 필드에 인덱스 적용
  - userId
  - username
  - email
  - role
  - status
- 문자열 필드에 trim 적용
- 타임스탬프 자동 관리 (createdAt, updatedAt)

## 6. 사용자 경험
- 다국어 지원 (한국어, 영어, 일본어)
- 테마 설정 (라이트/다크 모드)
- 알림 설정 (이메일/푸시)
- 프로필 정보 관리

## 7. 주의사항
- 비밀번호는 반드시 해싱하여 저장
- 민감한 정보는 JSON 변환 시 제외
- 계정 잠금 시 적절한 에러 메시지 전달
- 언어 설정은 프론트엔드와 동기화 필요

## 8. 향후 개선사항
- 소셜 로그인 연동
- 2단계 인증 추가
- 프로필 이미지 업로드 기능
- 사용자 활동 로그 추가
- 권한 그룹 시스템 구현 