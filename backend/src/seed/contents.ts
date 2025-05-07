import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content } from '../schemas/content.schema';

@Injectable()
export class ContentSeeder {
  constructor(
    @InjectModel(Content.name) private contentModel: Model<Content>,
  ) {}

  async seedContents() {
    const contents = [
      {
        id: 'trend-1',
        title: 'ChatGPT-5 출시 임박, 새로운 기능 미리보기',
        content: 'OpenAI가 곧 출시할 ChatGPT-5의 새로운 기능과 성능 개선사항을 상세히 알아봅니다. 이번 업데이트에서는 더욱 향상된 자연어 처리 능력과 함께 다중 모달리티 지원이 강화되었습니다.',
        category: 'trending',
        subcategory: 'ai-tech',
        description: 'OpenAI가 곧 출시할 ChatGPT-5의 새로운 기능과 성능 개선사항을 알아봅니다.',
        author: '64f5e91e1cda4b8a3668b95b', // admin 사용자 ID
        image: '/images/trending/chatgpt5-preview.jpg',
        date: '2024-04-23',
        views: 15234,
        likes: 892
      },
      {
        id: 'trend-2',
        title: '2024 재택근무 트렌드 리포트',
        content: '글로벌 기업들의 재택근무 현황과 미래 전망을 분석합니다. 코로나19 이후 변화된 근무 환경과 기업들의 적응 방식, 그리고 앞으로의 전망을 살펴봅니다.',
        category: 'trending',
        subcategory: 'digital-nomad',
        description: '글로벌 기업들의 재택근무 현황과 미래 전망을 분석합니다.',
        author: '64f5e91e1cda4b8a3668b95b',
        image: '/images/trending/remote-work-2024.jpg',
        date: '2024-04-22',
        views: 12453,
        likes: 731
      },
      {
        id: 'life-1',
        title: '직장인 아침 루틴 만들기',
        content: '바쁜 직장인을 위한 효율적인 아침 시간 활용법을 자세히 소개합니다. 시간 관리 전문가들이 추천하는 최적의 아침 루틴과 실천 방법을 알아봅니다.',
        category: 'lifestyle',
        subcategory: 'self-improvement',
        description: '바쁜 직장인을 위한 효율적인 아침 시간 활용법을 소개합니다.',
        author: '64f5e91e1cda4b8a3668b95b',
        image: '/images/lifestyle/morning-routine.jpg',
        date: '2024-04-23',
        views: 8234,
        likes: 567
      },
      {
        id: 'life-2',
        title: '월급 3배 만드는 부업 아이디어',
        content: '직장인이 실천할 수 있는 현실적인 부업 방법을 상세히 알아봅니다. 실제 성공 사례와 함께 시작 방법, 주의사항을 설명합니다.',
        category: 'lifestyle',
        subcategory: 'side-hustle',
        description: '직장인이 실천할 수 있는 현실적인 부업 방법을 알아봅니다.',
        author: '64f5e91e1cda4b8a3668b95b',
        image: '/images/lifestyle/side-hustle.jpg',
        date: '2024-04-22',
        views: 10234,
        likes: 892
      },
      {
        id: 'shop-1',
        title: '아마존 직구 필수템 TOP 10',
        content: '해외직구 고수들이 추천하는 아마존 인기 제품을 상세히 소개합니다. 가성비 좋은 제품부터 한정판 아이템까지 다양한 추천 상품을 확인해보세요.',
        category: 'shopping',
        subcategory: 'shopping',
        description: '해외직구 고수들이 추천하는 아마존 인기 제품을 소개합니다.',
        author: '64f5e91e1cda4b8a3668b95b',
        image: '/images/shopping/amazon-picks.jpg',
        date: '2024-04-23',
        views: 7234,
        likes: 432
      },
      {
        id: 'shop-2',
        title: '2024 봄 패션 트렌드',
        content: '올 봄 놓치면 후회할 패션 아이템을 상세히 소개합니다. 스타일리스트가 추천하는 트렌디한 아이템과 코디 팁을 확인해보세요.',
        category: 'shopping',
        subcategory: 'fashion',
        description: '올 봄 놓치면 후회할 패션 아이템을 소개합니다.',
        author: '64f5e91e1cda4b8a3668b95b',
        image: '/images/shopping/spring-fashion.jpg',
        date: '2024-04-22',
        views: 9234,
        likes: 678
      },
      {
        id: 'food-1',
        title: '직장인 한끼 레시피',
        content: '15분만에 완성하는 든든한 한끼 요리법을 자세히 소개합니다. 영양가 있고 맛있는 간단 레시피로 바쁜 일상 속 건강한 식사를 준비해보세요.',
        category: 'food',
        subcategory: 'recipe',
        description: '15분만에 완성하는 든든한 한끼 요리법을 소개합니다.',
        author: '64f5e91e1cda4b8a3668b95b',
        image: '/images/food/quick-meal.jpg',
        date: '2024-04-23',
        views: 6234,
        likes: 445
      },
      {
        id: 'food-2',
        title: '서울 숨은 맛집 TOP 10',
        content: '로컬이 추천하는 진짜 맛집을 상세히 소개합니다. 인스타그램에서 찾기 힘든 진정한 맛집들의 위치와 추천 메뉴를 확인해보세요.',
        category: 'food',
        subcategory: 'restaurant',
        description: '로컬이 추천하는 진짜 맛집을 소개합니다.',
        author: '64f5e91e1cda4b8a3668b95b',
        image: '/images/food/seoul-food.jpg',
        date: '2024-04-22',
        views: 8234,
        likes: 567
      },
      {
        id: 'hobby-1',
        title: '주말 캠핑 초보 가이드',
        content: '캠핑 입문자를 위한 필수 준비물과 꿀팁을 상세히 소개합니다. 초보자도 쉽게 따라할 수 있는 캠핑 노하우와 추천 장비를 알아보세요.',
        category: 'hobby',
        subcategory: 'outdoor',
        description: '캠핑 입문자를 위한 필수 준비물과 꿀팁을 소개합니다.',
        author: '64f5e91e1cda4b8a3668b95b',
        image: '/images/hobby/camping-guide.jpg',
        date: '2024-04-23',
        views: 5234,
        likes: 345
      },
      {
        id: 'hobby-2',
        title: '반려견 분리불안 극복하기',
        content: '전문가가 알려주는 반려견 분리불안 해결 방법을 상세히 소개합니다. 행동 교정 전문가의 조언과 함께 실천 가능한 훈련 방법을 알아보세요.',
        category: 'hobby',
        subcategory: 'pets',
        description: '전문가가 알려주는 반려견 분리불안 해결 방법.',
        author: '64f5e91e1cda4b8a3668b95b',
        image: '/images/hobby/dog-training.jpg',
        date: '2024-04-22',
        views: 7234,
        likes: 512
      },
      {
        id: 'tech-1',
        title: '애플 비전 프로 실사용 후기',
        content: '한 달간 애플 비전 프로를 사용해본 솔직한 리뷰를 공개합니다. 실제 사용 경험과 장단점, 구매 전 고려사항을 자세히 알아보세요.',
        category: 'tech',
        subcategory: 'gadgets',
        description: '한 달간 애플 비전 프로를 사용해본 솔직 리뷰.',
        author: '64f5e91e1cda4b8a3668b95b',
        image: '/images/tech/vision-pro.jpg',
        date: '2024-04-23',
        views: 11234,
        likes: 823
      },
      {
        id: 'tech-2',
        title: '2024년 노트북 구매 가이드',
        content: '용도별 추천 노트북과 구매 시 체크포인트를 상세히 소개합니다. IT 전문가가 추천하는 최신 노트북과 스펙 분석을 확인해보세요.',
        category: 'tech',
        subcategory: 'review',
        description: '용도별 추천 노트북과 구매 시 체크포인트.',
        author: '64f5e91e1cda4b8a3668b95b',
        image: '/images/tech/laptop-guide.jpg',
        date: '2024-04-22',
        views: 9234,
        likes: 678
      },
      {
        id: 'family-1',
        title: '초등학생 코딩 교육 시작하기',
        content: '아이와 함께하는 코딩 교육 방법과 추천 도구를 상세히 소개합니다. 연령별 맞춤 교육 방법과 효과적인 학습 도구를 알아보세요.',
        category: 'family',
        subcategory: 'education',
        description: '아이와 함께하는 코딩 교육 방법과 추천 도구.',
        author: '64f5e91e1cda4b8a3668b95b',
        image: '/images/family/kids-coding.jpg',
        date: '2024-04-23',
        views: 4234,
        likes: 234
      },
      {
        id: 'family-2',
        title: '시니어를 위한 스마트폰 가이드',
        content: '부모님을 위한 스마트폰 활용 팁과 추천 앱을 상세히 소개합니다. 쉽게 따라할 수 있는 기본 설정부터 유용한 앱 사용법까지 알아보세요.',
        category: 'family',
        subcategory: 'senior',
        description: '부모님을 위한 스마트폰 활용 팁과 추천 앱.',
        author: '64f5e91e1cda4b8a3668b95b',
        image: '/images/family/senior-tech.jpg',
        date: '2024-04-22',
        views: 6234,
        likes: 445
      }
    ];

    // 기존 데이터 삭제
    await this.contentModel.deleteMany({});
    
    // 콘텐츠 생성
    for (const content of contents) {
      await this.contentModel.create(content);
    }
    
    console.log('콘텐츠 시드 데이터 생성 완료');
  }
}

export const seedContents = async (contentModel: Model<Content>) => {
  const seeder = new ContentSeeder(contentModel);
  await seeder.seedContents();
}; 