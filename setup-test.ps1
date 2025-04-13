# 관리자 권한 확인
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "관리자 권한이 필요합니다. 스크립트를 관리자 권한으로 다시 실행해주세요." -ForegroundColor Red
    exit 1
}

# 현재 디렉토리 설정
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# 실행 정책 변경
Write-Host "PowerShell 실행 정책을 변경합니다..." -ForegroundColor Yellow
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
Write-Host "실행 정책이 변경되었습니다." -ForegroundColor Green

# Docker 상태 확인
Write-Host "Docker 상태를 확인합니다..." -ForegroundColor Yellow
try {
    $dockerVersion = docker version
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Docker가 정상적으로 실행 중입니다." -ForegroundColor Green
        
        # Docker Compose 실행
        Write-Host "테스트 환경을 구축하고 테스트를 실행합니다..." -ForegroundColor Yellow
        docker compose -f docker-compose.test.yml up --build
    } else {
        Write-Host "Docker 명령어 실행에 실패했습니다. Docker Desktop이 실행 중인지 확인해주세요." -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "Docker가 실행되지 않았습니다. Docker Desktop이 실행 중인지 확인해주세요." -ForegroundColor Red
    Write-Host "오류 상세: $_" -ForegroundColor Red
    exit 1
} 