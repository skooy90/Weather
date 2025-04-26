const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.js');
const userRoutes = require('./routes/userRoutes');
const contentRoutes = require('./routes/contentRoutes');
const detailRoutes = require('./routes/detailRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();

const app = express();

// 미들웨어 설정
app.use(cors({
  origin: ['http://localhost:3000', 'https://weather-frontend-knii.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB 연결 성공'))
  .catch(err => console.error('MongoDB 연결 실패:', err));

// 루트 경로 응답
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Weather API' });
});

// 라우트 설정
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contents', contentRoutes);
app.use('/api/details', detailRoutes);
app.use('/api/admin', adminRoutes);

// 에러 핸들링
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: '서버 에러가 발생했습니다.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
}); 