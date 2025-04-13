# PowerShell 실행 정책을 RemoteSigned로 변경
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force

Write-Host "PowerShell 실행 정책이 변경되었습니다." -ForegroundColor Green

# Docker 실행 확인
Write-Host "Docker 상태를 확인합니다..." -ForegroundColor Yellow
docker info

if ($LASTEXITCODE -eq 0) {
    Write-Host "Docker가 정상적으로 실행 중입니다." -ForegroundColor Green
    
    # Docker Compose 실행
    Write-Host "테스트 환경을 구축하고 테스트를 실행합니다..." -ForegroundColor Yellow
    docker compose -f docker-compose.test.yml up --build
} else {
    Write-Host "Docker가 실행되지 않았습니다. Docker Desktop이 실행 중인지 확인해주세요." -ForegroundColor Red
    exit 1
} 