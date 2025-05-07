const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { initializeCategories } = require('./controllers/categoryController');
const contentRoutes = require('./routes/contentRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// Health check 엔드포인트
app.get('/', (req, res) => {
  const mongoStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({
    status: 'ok',
    mongo: mongoStatus,
    timestamp: new Date().toISOString()
  });
});

// 라우트 설정
app.use('/api/contents', contentRoutes);
app.use('/api/categories', categoryRoutes);

// 데이터베이스 연결 및 서버 시작
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/weather', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('MongoDB 연결 성공');
  // 카테고리 초기화
  await initializeCategories();
})
.catch((error) => {
  console.error('MongoDB 연결 실패:', error);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
}); 