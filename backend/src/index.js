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

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS 설정
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:80',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

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
        url: process.env.SWAGGER_URL || 'http://localhost:8000',
        description: '서버'
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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

// MongoDB 연결 및 서버 시작
const PORT = process.env.PORT || 10000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongodb:27017/weather', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB 연결 성공');
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
    });
  } catch (error) {
    console.error('MongoDB 연결 실패:', error);
    process.exit(1);
  }
};

startServer(); 