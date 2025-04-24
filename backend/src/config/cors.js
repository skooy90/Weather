const cors = require('cors');
const config = require('./env');

// 허용된 오리진 목록
const allowedOrigins = [
  config.corsOrigin,
  'http://localhost:3000',
  'http://localhost:5000'
];

// CORS 옵션 설정
const corsOptions = {
  origin: function (origin, callback) {
    // 개발 환경에서는 모든 오리진 허용
    if (config.env === 'development') {
      return callback(null, true);
    }

    // 프로덕션 환경에서는 허용된 오리진만 허용
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS 정책에 의해 차단되었습니다.'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24시간
};

module.exports = cors(corsOptions); 