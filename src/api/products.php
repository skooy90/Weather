<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/Product.php';
require_once __DIR__ . '/../controllers/ProductController.php';
require_once __DIR__ . '/../middleware/SecurityMiddleware.php';

// 보안 헤더 설정
SecurityMiddleware::setSecurityHeaders();
SecurityMiddleware::hideServerInfo();

// CORS 설정
header('Access-Control-Allow-Origin: ' . $_ENV['ALLOWED_ORIGINS']);
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-API-Key');
header('Access-Control-Allow-Credentials: true');

// OPTIONS 요청 처리
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// API 키 검증
SecurityMiddleware::checkApiKey();

// Origin 검증
SecurityMiddleware::checkOrigin();

// 입력 데이터 살균
$_GET = SecurityMiddleware::sanitizeInput($_GET);
$_POST = SecurityMiddleware::sanitizeInput($_POST);
$_REQUEST = SecurityMiddleware::sanitizeInput($_REQUEST);

// 파일 업로드 처리
if (isset($_FILES) && !empty($_FILES)) {
    try {
        foreach ($_FILES as $file) {
            SecurityMiddleware::validateFileUpload($file);
            $uploadDir = __DIR__ . '/../../uploads';
            $fileName = SecurityMiddleware::secureFileUpload($file, $uploadDir);
            // 파일 정보를 POST 데이터에 추가
            $_POST['uploaded_files'][] = $fileName;
        }
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode(['error' => $e->getMessage()]);
        exit;
    }
}

// 컨트롤러 인스턴스 생성 및 요청 처리
$controller = new ProductController();
$controller->handleRequest();
?> 