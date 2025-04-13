<?php
require 'vendor/autoload.php'; // Composer로 설치한 경우

$uri = "mongodb+srv://skooy90:<db_password>@skyman.r0gqkcz.mongodb.net/?retryWrites=true&w=majority&appName=SkyMan";

try {
    $client = new MongoDB\Client($uri);
    echo "MongoDB 연결 성공!";
} catch (Exception $e) {
    echo "연결 실패: " . $e->getMessage();
}
?>
