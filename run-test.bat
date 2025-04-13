@echo off
echo 테스트 실행을 시작합니다...
echo 관리자 권한이 필요합니다. 권한 요청 창이 나타나면 '예'를 선택해주세요.

powershell -Command "Start-Process powershell -Verb RunAs -ArgumentList '-NoExit -Command \"cd ''%~dp0''; .\setup-test.ps1\"'"

if %ERRORLEVEL% NEQ 0 (
    echo 오류가 발생했습니다. 관리자 권한으로 실행할 수 없습니다.
    pause
    exit /b 1
) 