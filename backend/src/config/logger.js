const winston = require('winston');
const { format, transports } = winston;
const { combine, timestamp, printf, colorize } = format;
const config = require('./env');

// 로그 포맷 정의
const logFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}] : ${message}`;
  if (Object.keys(metadata).length > 0) {
    msg += ` ${JSON.stringify(metadata)}`;
  }
  return msg;
});

// 로거 생성
const logger = winston.createLogger({
  level: config.logLevel,
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    // 콘솔 출력
    new transports.Console({
      format: combine(
        colorize(),
        logFormat
      )
    }),
    // 파일 출력
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    new transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  ]
});

// 프로덕션 환경이 아닐 경우 디버그 로그도 출력
if (config.env !== 'production') {
  logger.add(new transports.Console({
    level: 'debug',
    format: combine(
      colorize(),
      logFormat
    )
  }));
}

module.exports = logger; 