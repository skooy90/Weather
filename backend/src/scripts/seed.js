import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Content from '../models/Content.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const categories = ['trending', 'lifestyle', 'shopping', 'food', 'hobby', 'tech', 'family'];

const sampleContents = [
  {
    title: 'ChatGPT-5 출시 임박, 새로운 기능 미리보기',
    content: 'OpenAI가 곧 출시할 ChatGPT-5의 새로운 기능과 성능 개선사항을 알아봅니다. 이번 업데이트에서는 더 자연스러운 대화 능력과 복잡한 작업 처리 능력이 크게 향상될 것으로 예상됩니다.',
    author: 'AI 전문가',
    category: 'trending',
    image: '/images/trending/chatgpt5-preview.jpg',
    views: 15234,
    likes: 892,
    comments: [
      {
        author: '홍길동',
        content: '정말 기대되는 업데이트네요!',
        createdAt: new Date('2024-03-20T10:00:00Z')
      }
    ]
  },
  {
    title: '직장인 아침 루틴 만들기',
    content: '바쁜 직장인을 위한 효율적인 아침 시간 활용법을 소개합니다. 30분만 투자해도 하루를 더 생산적으로 보낼 수 있는 방법들을 알아봅니다.',
    author: '생활 코치',
    category: 'lifestyle',
    image: '/images/lifestyle/morning-routine.jpg',
    views: 8234,
    likes: 567,
    comments: [
      {
        author: '김철수',
        content: '내일부터 바로 실천해보겠습니다!',
        createdAt: new Date('2024-03-20T11:00:00Z')
      }
    ]
  },
  {
    title: '2024 봄 패션 트렌드',
    content: '올 봄 놓치면 후회할 패션 아이템을 소개합니다. 지속 가능한 패션과 편안한 스타일이 주를 이루는 2024년 봄 트렌드를 알아봅니다.',
    author: '패션 에디터',
    category: 'shopping',
    image: '/images/shopping/spring-fashion.jpg',
    views: 9234,
    likes: 678,
    comments: [
      {
        author: '이영희',
        content: '이번 시즌 트렌드 정말 예쁘네요!',
        createdAt: new Date('2024-03-20T12:00:00Z')
      }
    ]
  }
];

const createUsers = async () => {
  const salt = await bcrypt.genSalt(10);
  return [
    {
      username: 'admin',
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', salt),
      role: 'admin',
      status: 'active'
    },
    {
      username: 'user1',
      email: 'user1@example.com',
      password: await bcrypt.hash('user123', salt),
      role: 'user',
      status: 'active'
    }
  ];
};

const seedDatabase = async () => {
  try {
    // MongoDB 연결
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB에 연결되었습니다.');

    // 기존 데이터 삭제
    await Content.deleteMany({});
    await User.deleteMany({});
    console.log('기존 데이터가 삭제되었습니다.');

    // 새 데이터 삽입
    const contents = await Content.insertMany(sampleContents);
    const users = await createUsers();
    const insertedUsers = await User.insertMany(users);
    
    console.log(`${contents.length}개의 컨텐츠가 추가되었습니다.`);
    console.log(`${insertedUsers.length}개의 사용자가 추가되었습니다.`);

    // 연결 종료
    await mongoose.disconnect();
    console.log('데이터베이스 연결이 종료되었습니다.');
  } catch (error) {
    console.error('데이터베이스 초기화 중 오류가 발생했습니다:', error);
    process.exit(1);
  }
};

seedDatabase(); 