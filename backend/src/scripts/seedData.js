/**
 * @fileoverview 데이터베이스 초기 데이터 생성 스크립트
 * @description MongoDB에 초기 상품, 상품 상세 정보, 컨텐츠 데이터를 생성합니다.
 */

const mongoose = require('mongoose');
require('dotenv').config();
const Content = require('../models/Content');
const User = require('../models/User');
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
    console.log('기존 데이터가 삭제되었습니다.');

    // 관리자 계정 생성
    const adminPassword = await bcrypt.hash('qwe@123', 10);
    const admin = await User.create({
      userId: 'admin123',
      username: 'admin',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin',
      status: 'active',
      profile: {
        name: '관리자',
        bio: '시스템 관리자',
        avatar: 'https://example.com/avatar/admin.jpg',
        language: 'ko'
      },
      preferences: {
        theme: 'light',
        notifications: {
          email: true,
          push: true
        }
      }
    });
    console.log('관리자 계정이 생성되었습니다.');

    // 일반 사용자 계정 생성
    const userPassword = await bcrypt.hash('password123', 10);
    const users = await User.create([
      {
        userId: 'user123',
        username: 'user1',
        email: 'user1@example.com',
        password: userPassword,
        role: 'user',
        status: 'active',
        profile: {
          name: '사용자1',
          bio: '일반 사용자',
          avatar: 'https://example.com/avatar/user1.jpg',
          language: 'ko'
        },
        preferences: {
          theme: 'light',
          notifications: {
            email: true,
            push: true
          }
        }
      },
      {
        userId: 'user456',
        username: 'user2',
        email: 'user2@example.com',
        password: userPassword,
        role: 'user',
        status: 'active',
        profile: {
          name: '사용자2',
          bio: '일반 사용자',
          avatar: 'https://example.com/avatar/user2.jpg',
          language: 'ko'
        },
        preferences: {
          theme: 'light',
          notifications: {
            email: true,
            push: true
          }
        }
      }
    ]);
    console.log('일반 사용자 계정이 생성되었습니다.');

    // 콘텐츠 생성
    const contents = await Content.create([
      {
        title: 'ChatGPT-5 출시 임박, 새로운 기능 미리보기',
        description: 'ChatGPT-5의 새로운 기능에 대한 상세한 내용...',
        category: 'ai-tech',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
        date: '2024-04-23',
        views: 15234,
        likes: 892,
        comments: [
          {
            user: users[0]._id,
            text: '정말 기대됩니다!',
            date: '2024-04-23'
          }
        ]
      },
      {
        title: 'React 19의 새로운 기능',
        description: 'React 19의 새로운 기능에 대한 상세한 내용...',
        category: 'ai-tech',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
        date: '2024-04-22',
        views: 11234,
        likes: 731,
        comments: [
          {
            user: users[1]._id,
            text: '좋은 정보 감사합니다.',
            date: '2024-04-22'
          }
        ]
      },
      {
        title: '2024년 최고의 스마트폰 추천',
        description: '2024년 최고의 스마트폰 추천 목록...',
        category: 'digital-nomad',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
        date: '2024-04-21',
        views: 9876,
        likes: 567,
        comments: []
      },
      {
        title: '건강한 식습관 만들기',
        description: '건강한 식습관을 만드는 방법...',
        category: 'self-improvement',
        image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352',
        date: '2024-04-20',
        views: 0,
        likes: 0,
        comments: []
      }
    ]);
    console.log('콘텐츠가 생성되었습니다.');

    console.log('데이터베이스 시딩이 완료되었습니다.');
    process.exit(0);
  } catch (err) {
    console.error('데이터베이스 시딩 중 오류가 발생했습니다:', err);
    process.exit(1);
  }
} 