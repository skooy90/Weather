const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = [
  {
    name: '파이토신 재생크림',
    price: 35000,
    description: '피부 재생을 돕는 크림',
    imageUrl: 'https://example.com/images/phytosin.jpg',
    category: '크림',
    stock: 100,
    status: '판매중'
  },
  {
    name: '코나피딜 피니쉬로션',
    price: 32000,
    description: '피부 마무리를 위한 로션',
    imageUrl: 'https://example.com/images/konafidil.jpg',
    category: '로션',
    stock: 80,
    status: '판매중'
  },
  {
    name: '세멘잘라이트 크림',
    price: 38000,
    description: '피부 밝기를 개선하는 크림',
    imageUrl: 'https://example.com/images/semenzalite.jpg',
    category: '크림',
    stock: 90,
    status: '판매중'
  },
  {
    name: '겔 폴리싱',
    price: 28000,
    description: '피부 각질 제거용 겔',
    imageUrl: 'https://example.com/images/gel-polishing.jpg',
    category: '폴리싱',
    stock: 70,
    status: '판매중'
  },
  {
    name: '겔 스타더',
    price: 30000,
    description: '피부 스타터 겔',
    imageUrl: 'https://example.com/images/gel-starter.jpg',
    category: '기타',
    stock: 60,
    status: '판매중'
  },
  {
    name: '로션 폴리싱',
    price: 25000,
    description: '피부 각질 제거용 로션',
    imageUrl: 'https://example.com/images/lotion-polishing.jpg',
    category: '폴리싱',
    stock: 85,
    status: '판매중'
  },
  {
    name: '그린박신 스트롱',
    price: 40000,
    description: '강력한 피부 보호 크림',
    imageUrl: 'https://example.com/images/greenbaxin.jpg',
    category: '크림',
    stock: 75,
    status: '판매중'
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect('mongodb://mongodb:27017/weather', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await Product.deleteMany({});
    await Product.insertMany(products);

    console.log('상품 데이터가 성공적으로 추가되었습니다.');
    process.exit(0);
  } catch (error) {
    console.error('상품 데이터 추가 중 오류 발생:', error);
    process.exit(1);
  }
};

seedProducts(); 