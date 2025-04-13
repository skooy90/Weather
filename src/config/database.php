<?php
class Database {
    private $client;
    private $db;

    public function __construct() {
        try {
            $this->client = new MongoDB\Client(
                "mongodb://" . $_ENV['MONGODB_HOST'] . ":" . $_ENV['MONGODB_PORT']
            );
            $this->db = $this->client->selectDatabase($_ENV['MONGODB_DATABASE']);
        } catch (MongoDB\Driver\Exception\Exception $e) {
            die("MongoDB 연결 실패: " . $e->getMessage());
        }
    }

    public function getCollection($collection) {
        return $this->db->selectCollection($collection);
    }
}
?> 