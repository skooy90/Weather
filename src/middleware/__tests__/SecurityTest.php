<?php
use PHPUnit\Framework\TestCase;

class SecurityTest extends TestCase {
    private $client;

    protected function setUp(): void {
        $this->client = new GuzzleHttp\Client([
            'base_uri' => 'http://localhost:8080',
            'headers' => [
                'Content-Type' => 'application/json',
                'X-API-Key' => $_ENV['API_KEY']
            ]
        ]);
    }

    public function testSqlInjectionPrevention() {
        $this->expectException(GuzzleHttp\Exception\ClientException::class);
        
        $this->client->get('/api/products', [
            'query' => [
                'search' => "' OR '1'='1"
            ]
        ]);
    }

    public function testXssPrevention() {
        $response = $this->client->post('/api/products', [
            'json' => [
                'name' => '<script>alert("xss")</script>',
                'price' => 10000
            ]
        ]);

        $data = json_decode($response->getBody(), true);
        $this->assertStringNotContainsString('<script>', $data['name']);
    }

    public function testFileUploadSecurity() {
        $this->expectException(GuzzleHttp\Exception\ClientException::class);

        $this->client->post('/api/upload', [
            'multipart' => [
                [
                    'name' => 'file',
                    'contents' => fopen('tests/fixtures/malicious.php', 'r')
                ]
            ]
        ]);
    }

    public function testCommandInjectionPrevention() {
        $this->expectException(GuzzleHttp\Exception\ClientException::class);

        $this->client->get('/api/products', [
            'query' => [
                'sort' => '; rm -rf /'
            ]
        ]);
    }

    public function testServerInfoHiding() {
        $response = $this->client->get('/api/products');
        
        $headers = $response->getHeaders();
        $this->assertArrayNotHasKey('X-Powered-By', $headers);
    }

    public function testCorsSecurity() {
        $response = $this->client->get('/api/products', [
            'headers' => [
                'Origin' => 'http://malicious-site.com'
            ]
        ]);
        $this->assertArrayNotHasKey('Access-Control-Allow-Origin', $response->getHeaders());
    }

    public function testRateLimiting() {
        $this->expectException(GuzzleHttp\Exception\ClientException::class);

        // 연속 100회 요청
        for ($i = 0; $i < 100; $i++) {
            $this->client->get('/api/products');
        }
    }
}
?> 