/**
 * @fileoverview 데이터베이스 초기 데이터 생성 스크립트
 * @description MongoDB에 초기 상품, 상품 상세 정보, 컨텐츠 데이터를 생성합니다.
 */

const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');
const ProductDetail = require('../models/ProductDetail');
const Content = require('../models/Content');
const User = require('../models/User');
const Comment = require('../models/Comment');
const bcrypt = require('bcryptjs');

console.log('데이터베이스 연결을 시작합니다...');
console.log('MONGODB_URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB에 성공적으로 연결되었습니다.');
    return seedDatabase();
  })
  .catch(err => {
    console.error('MongoDB 연결 중 오류가 발생했습니다:', err);
    process.exit(1);
  });

/**
 * 초기 상품 데이터
 * @type {Array<Object>}
 */
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

/**
 * 초기 상품 상세 정보 데이터
 * @type {Array<Object>}
 */
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

/**
 * 초기 컨텐츠 데이터
 * @type {Array<Object>}
 */
const dummyContents = [
  {
    title: "ChatGPT-5 출시 임박, 새로운 기능 미리보기",
    category: "ai-tech",
    description: "OpenAI가 곧 출시할 ChatGPT-5의 새로운 기능과 성능 개선사항을 알아봅니다.",
    image: "https://source.unsplash.com/random/800x600/?ai,technology",
    date: "2024-04-23",
    views: 15234,
    likes: 892,
    comments: [
      {
        user: "tech_lover",
        text: "정말 기대됩니다!",
        date: "2024-04-23"
      }
    ]
  },
  {
    title: "2024 재택근무 트렌드 리포트",
    category: "digital-nomad",
    description: "글로벌 기업들의 재택근무 현황과 미래 전망을 분석합니다.",
    image: "https://source.unsplash.com/random/800x600/?remote,work",
    date: "2024-04-22",
    views: 12453,
    likes: 731,
    comments: [
      {
        user: "remote_worker",
        text: "재택근무가 대세네요!",
        date: "2024-04-22"
      }
    ]
  },
  {
    title: "직장인 아침 루틴 만들기",
    category: "self-improvement",
    description: "바쁜 직장인을 위한 효율적인 아침 시간 활용법을 소개합니다.",
    image: "https://source.unsplash.com/random/800x600/?morning,routine",
    date: "2024-04-23",
    views: 8234,
    likes: 567,
    comments: []
  },
  {
    title: "월급 3배 만드는 부업 아이디어",
    category: "side-hustle",
    description: "직장인이 실천할 수 있는 현실적인 부업 방법을 알아봅니다.",
    image: "https://source.unsplash.com/random/800x600/?business,work",
    date: "2024-04-22",
    views: 10234,
    likes: 892,
    comments: []
  },
  {
    title: "주말 캠핑 초보 가이드",
    category: "outdoor",
    description: "캠핑 입문자를 위한 필수 준비물과 꿀팁을 소개합니다.",
    image: "https://source.unsplash.com/random/800x600/?camping,nature",
    date: "2024-04-23",
    views: 5234,
    likes: 345,
    comments: []
  }
];

/**
 * 데이터베이스 초기 데이터 생성 함수
 * @async
 * @function seedDatabase
 * @returns {Promise<void>}
 */
async function seedDatabase() {
  try {
    console.log('기존 데이터 삭제를 시작합니다...');
    await User.deleteMany({});
    await Content.deleteMany({});
    await Comment.deleteMany({});
    console.log('기존 데이터가 삭제되었습니다.');

    // 관리자 계정 생성
    const adminPassword = await bcrypt.hash('qwe@123', 10);
    const admin = await User.create({
      name: '관리자',
      email: 'admin@example.com',
      password: adminPassword,
      phone: '010-1234-5678',
      role: 'admin'
    });
    console.log('관리자 계정이 생성되었습니다.');

    // 일반 사용자 계정 생성
    const userPassword = await bcrypt.hash('password123', 10);
    const users = await User.create([
      {
        name: '사용자1',
        email: 'user1@example.com',
        password: userPassword,
        phone: '010-2345-6789',
        role: 'user'
      },
      {
        name: '사용자2',
        email: 'user2@example.com',
        password: userPassword,
        phone: '010-3456-7890',
        role: 'user'
      }
    ]);
    console.log('일반 사용자 계정이 생성되었습니다.');

    // 콘텐츠 생성
    const contents = await Content.create([
      {
        title: 'ChatGPT-5 출시 임박, 새로운 기능 미리보기',
        description: 'ChatGPT-5의 새로운 기능에 대한 상세한 내용...',
        category: '트렌드',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
        author: admin._id,
        status: '게시',
        views: 15234
      },
      {
        title: 'React 19의 새로운 기능',
        description: 'React 19의 새로운 기능에 대한 상세한 내용...',
        category: '테크',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
        author: admin._id,
        status: '게시',
        views: 11234
      },
      {
        title: '2024년 최고의 스마트폰 추천',
        description: '2024년 최고의 스마트폰 추천 목록...',
        category: '쇼핑',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
        author: users[0]._id,
        status: '게시',
        views: 9876
      },
      {
        title: '건강한 식습관 만들기',
        description: '건강한 식습관을 만드는 방법...',
        category: '푸드',
        image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352',
        author: users[1]._id,
        status: '임시저장',
        views: 0
      }
    ]);
    console.log('콘텐츠가 생성되었습니다.');

    // 댓글 생성
    await Comment.create([
      {
        content: '정말 기대됩니다!',
        author: users[0]._id,
        contentId: contents[0]._id,
        status: '게시'
      },
      {
        content: '좋은 정보 감사합니다.',
        author: users[1]._id,
        contentId: contents[0]._id,
        status: '게시'
      },
      {
        content: 'React 19가 정말 기대됩니다.',
        author: users[0]._id,
        contentId: contents[1]._id,
        status: '게시'
      },
      {
        content: '스마트폰 추천 감사합니다.',
        author: users[1]._id,
        contentId: contents[2]._id,
        status: '숨김'
      }
    ]);
    console.log('댓글이 생성되었습니다.');

    console.log('데이터베이스 시딩이 완료되었습니다.');
    process.exit(0);
  } catch (err) {
    console.error('데이터베이스 시딩 중 오류가 발생했습니다:', err);
    process.exit(1);
  }
} 