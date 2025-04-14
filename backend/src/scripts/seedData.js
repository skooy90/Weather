const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');
const ProductDetail = require('../models/ProductDetail');

const products = [
  {
    name: "그린박신 스트롱",
    price: 35000,
    description: "더욱 강력한 그린박신 스트롱 앰플",
    category: "앰플",
    imageUrl: "/images/greenbacksin.jpg",
    stock: 100,
    status: "판매중"
  }
  // 추가 상품들...
];

const productDetails = [
  {
    productId: null, // 상품 생성 후 ID 설정
    specifications: {
      "용량": "30ml",
      "주요성분": "쿨링 특허 성분",
      "사용기한": "제조일로부터 12개월"
    },
    features: [
      {
        title: "재생+보습",
        description: "2배 Up↑"
      },
      {
        title: "점성+온도",
        description: "2배 Down↓"
      }
    ],
    images: [
      {
        url: "/images/green_1.jpg",
        alt: "그린박신 스트롱 상세 이미지 1"
      },
      {
        url: "/images/green_2.jpg",
        alt: "그린박신 스트롱 상세 이미지 2"
      }
    ]
  }
];

async function seedDatabase() {
  try {
    // MongoDB 연결
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB 연결 성공');

    // 기존 데이터 삭제
    await Product.deleteMany({});
    await ProductDetail.deleteMany({});
    console.log('기존 데이터 삭제 완료');

    // 상품 데이터 추가
    const createdProducts = await Product.create(products);
    console.log('상품 데이터 추가 완료');

    // 상품 상세 정보에 productId 설정 및 추가
    productDetails[0].productId = createdProducts[0]._id;
    await ProductDetail.create(productDetails);
    console.log('상품 상세 정보 추가 완료');

    console.log('데이터베이스 시드 완료');
    process.exit(0);
  } catch (error) {
    console.error('데이터베이스 시드 중 오류 발생:', error);
    process.exit(1);
  }
}

seedDatabase(); 