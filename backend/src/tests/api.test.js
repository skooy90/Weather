const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

describe('API 테스트', () => {
  let token;
  let userId;

  beforeAll(async () => {
    // MongoDB 연결
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/weather_app_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // 테스트용 사용자 생성
    const user = await User.create({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User'
    });
    userId = user._id;

    // 로그인하여 토큰 발급
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    token = response.body.token;
  });

  afterAll(async () => {
    // 테스트 데이터 정리
    await User.deleteMany({});
    await Product.deleteMany({});
    await Cart.deleteMany({});
    await mongoose.connection.close();
  });

  describe('인증 API', () => {
    test('로그인 성공', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    test('로그인 실패 - 잘못된 비밀번호', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });
      expect(response.statusCode).toBe(401);
    });
  });

  describe('상품 API', () => {
    test('상품 목록 조회', async () => {
      const response = await request(app)
        .get('/api/products')
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body.products)).toBe(true);
    });

    test('상품 생성', async () => {
      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Test Product',
          price: 10000,
          description: 'Test Description'
        });
      expect(response.statusCode).toBe(201);
      expect(response.body.product).toHaveProperty('_id');
    });
  });

  describe('장바구니 API', () => {
    test('장바구니 조회', async () => {
      const response = await request(app)
        .get('/api/cart')
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.cart).toHaveProperty('userId');
    });

    test('장바구니에 상품 추가', async () => {
      const response = await request(app)
        .post('/api/cart')
        .set('Authorization', `Bearer ${token}`)
        .send({
          productId: '507f1f77bcf86cd799439011',
          quantity: 1
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.cart.items).toHaveLength(1);
    });
  });
}); 