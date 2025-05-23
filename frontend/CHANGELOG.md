# Changelog

## [2024-04-26]
### Changed
- 프론트엔드 하드코딩 데이터 제거
  - CategoryFilter 컴포넌트에서 하드코딩된 카테고리 데이터 제거
  - Home 컴포넌트에서 하드코딩된 카테고리 데이터 제거
  - 모든 데이터를 백엔드 API를 통해 동적으로 관리하도록 변경
- API 통합
  - api.js에 카테고리 관련 API 엔드포인트 추가
  - 카테고리 목록 조회 API 추가
  - 서브카테고리 데이터 구조화 로직 추가
- 컴포넌트 개선
  - CategoryFilter 컴포넌트를 props 기반으로 수정
  - 동적 렌더링 로직 개선
  - 에러 처리 및 로딩 상태 관리 개선
- 데이터 흐름 최적화
  - 불필요한 상태 관리 제거
  - API 호출 로직 개선
  - 데이터 일관성 유지

// ... existing changelog entries ... 