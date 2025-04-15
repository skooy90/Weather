const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();
const productRoutes = require('./routes/productRoutes');
const productDetailRoutes = require('./routes/productDetailRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// 서버 타임아웃 설정
app.server = app.listen(process.env.PORT || 8000, '0.0.0.0', () => {
  console.log(`Server is running on port ${process.env.PORT || 8000}`);
});
app.server.keepAliveTimeout = 120000; // 2분
app.server.headersTimeout = 120000;   // 2분

// CORS 설정
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:80',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger 설정
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'KYSong Store API',
      version: '1.0.0',
      description: 'KYSong Store API 문서'
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: '개발 서버'
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// MongoDB 연결
mongoose.connect('mongodb://mongodb:27017/weather', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB 연결 성공'))
.catch(err => console.error('MongoDB 연결 실패:', err));

// 라우트 설정
app.use('/api/products', productRoutes);
app.use('/api/product-details', productDetailRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: '서버 에러가 발생했습니다.' });
}); 