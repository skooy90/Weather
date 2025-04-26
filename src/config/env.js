const envSchema = {
  VITE_API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  VITE_APP_ENV: import.meta.env.VITE_APP_ENV || 'development',
  VITE_APP_NAME: import.meta.env.VITE_APP_NAME || 'Weather App',
  VITE_APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  VITE_CACHE_TTL: import.meta.env.VITE_CACHE_TTL || '3600',
  VITE_ANALYTICS_ID: import.meta.env.VITE_ANALYTICS_ID || '',
  VITE_SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN || '',
  VITE_CDN_URL: import.meta.env.VITE_CDN_URL || '',
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