const envSchema = {
  // API 관련
  VITE_API_URL: import.meta.env.VITE_API_URL || 'http://localhost:10000',
  
  // 앱 설정
  VITE_APP_ENV: import.meta.env.VITE_APP_ENV || 'development',
  VITE_APP_NAME: import.meta.env.VITE_APP_NAME || 'Weather App',
  VITE_APP_BASE_URL: import.meta.env.VITE_APP_BASE_URL || '/',
  
  // 성능 관련
  VITE_CACHE_TTL: import.meta.env.VITE_CACHE_TTL || '3600',
  
  // 모니터링
  VITE_SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN || '',
};

// 환경 변수 검증
const validateEnv = () => {
  const requiredVars = ['VITE_API_URL'];
  const missingVars = requiredVars.filter(varName => !envSchema[varName]);
  
  if (missingVars.length > 0) {
    console.error('필수 환경 변수가 누락되었습니다:', missingVars);
    throw new Error('환경 변수 설정 오류');
  }
};

validateEnv();

export default envSchema; 