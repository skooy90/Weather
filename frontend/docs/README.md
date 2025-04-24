# Weather 웹 애플리케이션

## 프로젝트 개요
Weather는 날씨 정보를 제공하는 웹 애플리케이션입니다. 사용자 친화적인 인터페이스와 다양한 기능을 제공합니다.

## 주요 기능
- 날씨 정보 조회
- 사용자 인증 (로그인/회원가입)
- 다크모드 지원
- 댓글 시스템
- 반응형 디자인

## 기술 스택
### 프론트엔드
- React
- React Router
- Styled Components
- Context API

## 프로젝트 구조
```
frontend/
├── src/
│   ├── components/     # 재사용 가능한 컴포넌트
│   ├── pages/         # 페이지 컴포넌트
│   ├── utils/         # 유틸리티 함수
│   └── App.jsx        # 메인 애플리케이션
├── public/            # 정적 파일
└── docs/             # 문서
```

## 설치 및 실행
1. 프로젝트 클론
```bash
git clone [프로젝트 URL]
```

2. 의존성 설치
```bash
cd frontend
npm install
```

3. 개발 서버 실행
```bash
npm start
```

## 주요 컴포넌트
- `App.jsx`: 메인 애플리케이션 컴포넌트
- `Header.jsx`: 헤더 컴포넌트
- `Home.jsx`: 메인 페이지
- `ContentDetail.jsx`: 콘텐츠 상세 페이지
- `Login.jsx`: 로그인 페이지
- `SignUp.jsx`: 회원가입 페이지

## 라우팅
- `/`: 메인 페이지
- `/content/:id`: 콘텐츠 상세 페이지
- `/login`: 로그인 페이지
- `/signup`: 회원가입 페이지

## 상태 관리
- `AuthContext`: 로그인 상태 관리
- `ThemeContext`: 다크모드 상태 관리

## 스타일링
- Styled Components를 사용한 컴포넌트 스타일링
- 반응형 디자인 구현
- 다크모드 지원

## API 통신
- 로그인/회원가입
- 콘텐츠 조회
- 댓글 추가

## 개발 가이드라인
1. 컴포넌트 구조
   - 재사용 가능한 컴포넌트는 `components` 디렉토리에 작성
   - 페이지 컴포넌트는 `pages` 디렉토리에 작성

2. 스타일링
   - Styled Components 사용
   - 반응형 디자인 고려
   - 테마 일관성 유지

3. 상태 관리
   - Context API를 사용한 전역 상태 관리
   - 컴포넌트 내부 상태는 useState 사용

4. 에러 처리
   - API 통신 에러 처리
   - 사용자 친화적인 에러 메시지 표시

## 향후 개선 사항
- 사용자 프로필 페이지 구현
- 콘텐츠 검색 기능 개선
- 성능 최적화
- 테스트 코드 작성
- 접근성 개선

## 라이센스
MIT License 