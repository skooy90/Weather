# 이미지 디렉토리 구조

```
public/images/
├── trending/
│   ├── chatgpt5-preview.jpg
│   └── remote-work-2024.jpg
├── lifestyle/
│   ├── morning-routine.jpg
│   └── side-hustle.jpg
├── shopping/
│   ├── amazon-picks.jpg
│   └── spring-fashion.jpg
├── food/
│   ├── quick-meal.jpg
│   └── seoul-food.jpg
├── hobby/
│   ├── camping-guide.jpg
│   └── dog-training.jpg
├── tech/
│   ├── vision-pro.jpg
│   └── laptop-guide.jpg
└── family/
    ├── kids-coding.jpg
    └── senior-tech.jpg
```

## 이미지 요구사항

### 이미지 크기
- 권장 크기: 1200 x 800 픽셀
- 최소 크기: 800 x 600 픽셀
- 최대 파일 크기: 500KB

### 이미지 형식
- 포맷: JPG/JPEG
- 컬러 스페이스: sRGB
- 품질: 85%

### 최적화 가이드라인
1. 이미지는 반응형 디자인을 위해 다양한 해상도 지원
2. WebP 형식으로 자동 변환되어 제공
3. 레이지 로딩 적용을 위한 낮은 해상도 썸네일 버전 포함

### 이미지 명명 규칙
- 모든 파일명은 소문자 사용
- 단어 사이는 하이픈(-) 사용
- 의미있는 이름 사용 (예: chatgpt5-preview.jpg)

### 접근성
- 모든 이미지에 대체 텍스트(alt text) 제공
- 적절한 이미지 압축으로 빠른 로딩 보장 