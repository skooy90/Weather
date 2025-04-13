<?php
namespace App\Middleware;

class SecurityMiddleware {
    private $rateLimit = 100;
    private $rateLimitWindow = 60; // 60초
    private $requestCounts = [];

    public function handle($request, $next) {
        // SQL 인젝션 방지
        $this->preventSqlInjection($request);

        // XSS 방지
        $this->preventXss($request);

        // 파일 업로드 보안
        $this->secureFileUpload($request);

        // 명령어 인젝션 방지
        $this->preventCommandInjection($request);

        // 서버 정보 숨기기
        $this->hideServerInfo();

        // CORS 보안
        $this->handleCors($request);

        // Rate Limiting
        $this->rateLimit($request);

        return $next($request);
    }

    private function preventSqlInjection($request) {
        $params = array_merge($request->query->all(), $request->request->all());
        foreach ($params as $param) {
            if (is_string($param) && preg_match('/[\'"]/', $param)) {
                throw new \Exception('SQL injection attempt detected');
            }
        }
    }

    private function preventXss($request) {
        $params = array_merge($request->query->all(), $request->request->all());
        foreach ($params as $key => $param) {
            if (is_string($param)) {
                $request->request->set($key, htmlspecialchars($param, ENT_QUOTES, 'UTF-8'));
            }
        }
    }

    private function secureFileUpload($request) {
        if ($request->files->count() > 0) {
            foreach ($request->files->all() as $file) {
                $extension = $file->getClientOriginalExtension();
                if (in_array($extension, ['php', 'phtml', 'phar'])) {
                    throw new \Exception('Invalid file type');
                }
            }
        }
    }

    private function preventCommandInjection($request) {
        $params = array_merge($request->query->all(), $request->request->all());
        foreach ($params as $param) {
            if (is_string($param) && preg_match('/[;&|`]/', $param)) {
                throw new \Exception('Command injection attempt detected');
            }
        }
    }

    private function hideServerInfo() {
        header_remove('X-Powered-By');
    }

    private function handleCors($request) {
        $allowedOrigins = ['http://localhost:3000', 'https://yourdomain.com'];
        $origin = $request->headers->get('Origin');
        
        if ($origin && in_array($origin, $allowedOrigins)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type, Authorization, X-API-Key');
        }
    }

    private function rateLimit($request) {
        $ip = $request->getClientIp();
        $now = time();

        if (!isset($this->requestCounts[$ip])) {
            $this->requestCounts[$ip] = [
                'count' => 0,
                'window' => $now
            ];
        }

        if ($now - $this->requestCounts[$ip]['window'] > $this->rateLimitWindow) {
            $this->requestCounts[$ip] = [
                'count' => 0,
                'window' => $now
            ];
        }

        $this->requestCounts[$ip]['count']++;

        if ($this->requestCounts[$ip]['count'] > $this->rateLimit) {
            throw new \Exception('Rate limit exceeded');
        }
    }
}
?> 