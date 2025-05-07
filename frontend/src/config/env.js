export default {
  VITE_API_URL: import.meta.env.VITE_API_URL,
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