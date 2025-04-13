<?php
use PHPUnit\Framework\TestCase;

class ProductApiTest extends TestCase {
    private $client;
    private $apiKey;

    protected function setUp(): void {
        $this->client = new GuzzleHttp\Client([
            'base_uri' => 'http://localhost:8080',
            'headers' => [
                'Content-Type' => 'application/json',
                'X-API-Key' => $_ENV['API_KEY']
            ]
        ]);
    }

    public function testCreateProduct() {
        $response = $this->client->post('/api/products', [
            'json' => [
                'name' => '테스트 상품',
                'price' => 10000,
                'description' => '테스트 상품 설명'
            ]
        ]);

        $this->assertEquals(201, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        $this->assertArrayHasKey('id', $data);
    }

    public function testGetProduct() {
        $response = $this->client->get('/api/products/1');
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        $this->assertArrayHasKey('id', $data);
    }

    public function testUpdateProduct() {
        $response = $this->client->put('/api/products/1', [
            'json' => [
                'name' => '수정된 상품',
                'price' => 15000
            ]
        ]);

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        $this->assertEquals('수정된 상품', $data['name']);
    }

    public function testDeleteProduct() {
        $response = $this->client->delete('/api/products/1');
        $this->assertEquals(204, $response->getStatusCode());
    }

    public function testGetProductsList() {
        $response = $this->client->get('/api/products');
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        $this->assertIsArray($data);
    }

    public function testInvalidApiKey() {
        $this->expectException(GuzzleHttp\Exception\ClientException::class);
        $this->client->get('/api/products', [
            'headers' => [
                'X-API-Key' => 'invalid_key'
            ]
        ]);
    }
}
?> 