#!/bin/bash

# 색상 정의
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}테스트 환경 설정 중...${NC}"

# npm 의존성 설치
echo -e "${GREEN}npm 의존성 설치 중...${NC}"
npm install

# composer 의존성 설치
echo -e "${GREEN}composer 의존성 설치 중...${NC}"
composer install

# 프론트엔드 테스트 실행
echo -e "${GREEN}프론트엔드 테스트 실행 중...${NC}"
npm test

# 백엔드 테스트 실행
echo -e "${GREEN}백엔드 테스트 실행 중...${NC}"
./vendor/bin/phpunit tests/backend

# 보안 테스트 실행
echo -e "${GREEN}보안 테스트 실행 중...${NC}"
./vendor/bin/phpunit tests/security

echo -e "${GREEN}모든 테스트가 완료되었습니다!${NC}" 