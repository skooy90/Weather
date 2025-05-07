// 환경 변수 타입 정의
const envSchema = {
  VITE_API_URL: String,
  VITE_APP_TITLE: String,
  VITE_APP_DESCRIPTION: String,
  VITE_APP_VERSION: String,
  VITE_APP_ENV: String
};

// 환경 변수 값 가져오기
const env = {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_APP_TITLE: import.meta.env.VITE_APP_TITLE,
  VITE_APP_DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION,
  VITE_APP_VERSION: import.meta.env.VITE_APP_VERSION,
  VITE_APP_ENV: import.meta.env.VITE_APP_ENV
};

// 환경 변수 검증
const validateEnv = () => {
  const requiredVars = ['VITE_API_URL'];
  const missingVars = requiredVars.filter(varName => !env[varName]);
  
  if (missingVars.length > 0) {
    console.error('필수 환경 변수가 누락되었습니다:', missingVars);
    throw new Error('환경 변수 설정 오류');
  }
};

validateEnv();

export default env; 