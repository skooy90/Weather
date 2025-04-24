const Joi = require('joi');

// 환경 변수 스키마 정의
const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number()
    .default(3000),
  MONGODB_URI: Joi.string()
    .required()
    .description('MongoDB connection string'),
  JWT_SECRET: Joi.string()
    .required()
    .description('JWT secret key'),
  CORS_ORIGIN: Joi.string()
    .required()
    .description('CORS allowed origin'),
  LOG_LEVEL: Joi.string()
    .valid('error', 'warn', 'info', 'debug')
    .default('info')
}).unknown();

// 환경 변수 검증
const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`환경 변수 설정 오류: ${error.message}`);
}

// 검증된 환경 변수 내보내기
module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongodbUri: envVars.MONGODB_URI,
  jwtSecret: envVars.JWT_SECRET,
  corsOrigin: envVars.CORS_ORIGIN,
  logLevel: envVars.LOG_LEVEL
}; 