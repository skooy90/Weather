<?php
class Product {
    private $collection;

    public function __construct() {
        $db = new Database();
        $this->collection = $db->getCollection('products');
    }

    public function getProduct($id) {
        try {
            $product = $this->collection->findOne(['_id' => new MongoDB\BSON\ObjectId($id)]);
            return $product;
        } catch (Exception $e) {
            throw new Exception("상품 조회 실패: " . $e->getMessage());
        }
    }

    public function getProducts($page = 1, $limit = 10) {
        try {
            $skip = ($page - 1) * $limit;
            $products = $this->collection->find(
                [],
                [
                    'skip' => $skip,
                    'limit' => $limit,
                    'sort' => ['created_at' => -1]
                ]
            );
            return iterator_to_array($products);
        } catch (Exception $e) {
            throw new Exception("상품 목록 조회 실패: " . $e->getMessage());
        }
    }

    public function createProduct($data) {
        try {
            $data['created_at'] = new MongoDB\BSON\UTCDateTime();
            $result = $this->collection->insertOne($data);
            return $result->getInsertedId();
        } catch (Exception $e) {
            throw new Exception("상품 생성 실패: " . $e->getMessage());
        }
    }

    public function updateProduct($id, $data) {
        try {
            $data['updated_at'] = new MongoDB\BSON\UTCDateTime();
            $result = $this->collection->updateOne(
                ['_id' => new MongoDB\BSON\ObjectId($id)],
                ['$set' => $data]
            );
            return $result->getModifiedCount() > 0;
        } catch (Exception $e) {
            throw new Exception("상품 수정 실패: " . $e->getMessage());
        }
    }

    public function deleteProduct($id) {
        try {
            $result = $this->collection->deleteOne(['_id' => new MongoDB\BSON\ObjectId($id)]);
            return $result->getDeletedCount() > 0;
        } catch (Exception $e) {
            throw new Exception("상품 삭제 실패: " . $e->getMessage());
        }
    }
}
?> 