<?php
class Database {
    private $client;
    private $db;

    public function __construct() {
        try {
            if (!isset($_ENV['MONGODB_URI'])) {
                throw new Exception('MONGODB_URI 환경 변수가 설정되지 않았습니다');
            }
            
            $this->client = new MongoDB\Client($_ENV['MONGODB_URI']);
            $uri = new MongoDB\Driver\URI($_ENV['MONGODB_URI']);
            $dbName = ltrim($uri->getDatabase(), '/');
            $this->db = $this->client->selectDatabase($dbName);
        } catch (Exception $e) {
            die("MongoDB 연결 실패: " . $e->getMessage());
        }
    }

    public function getCollection($collection) {
        return $this->db->selectCollection($collection);
    }
}
?> 