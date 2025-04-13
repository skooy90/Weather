<?php
class ProductController {
    private $productModel;

    public function __construct() {
        $this->productModel = new Product();
    }

    public function handleRequest() {
        $method = $_SERVER['REQUEST_METHOD'];
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $id = null;

        // URL에서 상품 ID 추출
        if (preg_match('/\/api\/products\/([^\/]+)/', $path, $matches)) {
            $id = $matches[1];
        }

        switch ($method) {
            case 'GET':
                if ($id) {
                    $this->getProduct($id);
                } else {
                    $this->getProducts();
                }
                break;
            case 'POST':
                $this->createProduct();
                break;
            case 'PUT':
                if ($id) {
                    $this->updateProduct($id);
                }
                break;
            case 'DELETE':
                if ($id) {
                    $this->deleteProduct($id);
                }
                break;
            default:
                $this->sendResponse(405, ['error' => 'Method not allowed']);
                break;
        }
    }

    private function getProduct($id) {
        try {
            $product = $this->productModel->getProduct($id);
            if ($product) {
                $this->sendResponse(200, $product);
            } else {
                $this->sendResponse(404, ['error' => 'Product not found']);
            }
        } catch (Exception $e) {
            $this->sendResponse(500, ['error' => $e->getMessage()]);
        }
    }

    private function getProducts() {
        try {
            $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
            $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
            $products = $this->productModel->getProducts($page, $limit);
            $this->sendResponse(200, $products);
        } catch (Exception $e) {
            $this->sendResponse(500, ['error' => $e->getMessage()]);
        }
    }

    private function createProduct() {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            if (!$data) {
                throw new Exception('Invalid input data');
            }

            $id = $this->productModel->createProduct($data);
            $this->sendResponse(201, ['id' => (string)$id]);
        } catch (Exception $e) {
            $this->sendResponse(500, ['error' => $e->getMessage()]);
        }
    }

    private function updateProduct($id) {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            if (!$data) {
                throw new Exception('Invalid input data');
            }

            $success = $this->productModel->updateProduct($id, $data);
            if ($success) {
                $this->sendResponse(200, ['message' => 'Product updated successfully']);
            } else {
                $this->sendResponse(404, ['error' => 'Product not found']);
            }
        } catch (Exception $e) {
            $this->sendResponse(500, ['error' => $e->getMessage()]);
        }
    }

    private function deleteProduct($id) {
        try {
            $success = $this->productModel->deleteProduct($id);
            if ($success) {
                $this->sendResponse(200, ['message' => 'Product deleted successfully']);
            } else {
                $this->sendResponse(404, ['error' => 'Product not found']);
            }
        } catch (Exception $e) {
            $this->sendResponse(500, ['error' => $e->getMessage()]);
        }
    }

    private function sendResponse($statusCode, $data) {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }
}
?> 