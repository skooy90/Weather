// 임시 데이터
const mockContents = {
  'trend-1': {
    id: 'trend-1',
    title: 'ChatGPT-5 출시 임박, 새로운 기능 미리보기',
    author: 'AI 전문가',
    content: '<h2>ChatGPT-5의 주요 기능</h2><p>OpenAI가 곧 출시할 ChatGPT-5의 새로운 기능과 성능 개선사항을 알아봅니다.</p><h3>성능 개선</h3><p>더 정확하고 자연스러운 대화가 가능해졌습니다.</p>',
    createdAt: '2024-04-23T10:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'trend',
    comments: [
      {
        id: 'c1',
        author: '기술애호가',
        content: '정말 기대됩니다!',
        createdAt: '2024-04-23T11:00:00.000Z'
      }
    ]
  },
  'trend-2': {
    id: 'trend-2',
    title: '2024 재택근무 트렌드 리포트',
    author: '근무환경 전문가',
    content: '<h2>재택근무 현황</h2><p>글로벌 기업들의 재택근무 현황과 미래 전망을 분석합니다.</p><h3>미래 전망</h3><p>재택근무는 앞으로도 계속될 것으로 예상됩니다.</p>',
    createdAt: '2024-04-22T10:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
    category: 'trend',
    comments: []
  },
  'life-1': {
    id: 'life-1',
    title: '직장인 아침 루틴 만들기',
    author: '생활습관 전문가',
    content: '<h2>효율적인 아침 시간</h2><p>바쁜 직장인을 위한 효율적인 아침 시간 활용법을 소개합니다.</p><h3>루틴 예시</h3><p>30분 운동, 15분 독서, 15분 계획 세우기</p>',
    createdAt: '2024-04-23T10:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'life',
    comments: []
  },
  'life-2': {
    id: 'life-2',
    title: '월급 3배 만드는 부업 아이디어',
    author: '재테크 전문가',
    content: '<h2>부업 아이디어</h2><p>직장인이 실천할 수 있는 현실적인 부업 방법을 알아봅니다.</p><h3>추천 부업</h3><p>온라인 강의 제작, 프리랜서 개발, 투자 등</p>',
    createdAt: '2024-04-22T10:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1511&q=80',
    category: 'life',
    comments: []
  },
  'tech-1': {
    id: 'tech-1',
    title: 'React 19의 새로운 기능',
    author: '프론트엔드 개발자',
    content: '<h2>React 19 주요 업데이트</h2><p>React 19에서 새롭게 추가된 기능들을 살펴봅니다.</p><h3>주요 변경사항</h3><p>서버 컴포넌트, 자동 배치, 새로운 훅 등</p>',
    createdAt: '2024-04-23T10:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'tech',
    comments: [
      {
        id: 't1',
        author: '개발자',
        content: '서버 컴포넌트가 정말 기대됩니다!',
        createdAt: '2024-04-23T11:00:00.000Z'
      }
    ]
  },
  'tech-2': {
    id: 'tech-2',
    title: 'Next.js 15 출시 예정',
    author: '웹 개발자',
    content: '<h2>Next.js 15의 새로운 기능</h2><p>Next.js 15에서 새롭게 추가될 기능들을 미리 살펴봅니다.</p><h3>주요 업데이트</h3><p>서버 액션, 캐싱 개선, 성능 최적화 등</p>',
    createdAt: '2024-04-22T10:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'tech',
    comments: [
      {
        id: 't2',
        author: '개발자',
        content: '서버 액션이 정말 편리해질 것 같네요!',
        createdAt: '2024-04-22T11:00:00.000Z'
      }
    ]
  },
  'shop-1': {
    id: 'shop-1',
    title: '아마존 직구 필수템 TOP 10',
    author: '쇼핑 전문가',
    content: '<h2>아마존 인기 제품</h2><p>해외직구 고수들이 추천하는 아마존 인기 제품을 소개합니다.</p><h3>추천 제품</h3><p>가성비 좋은 전자제품, 생활용품, 건강식품 등</p>',
    createdAt: '2024-04-23T10:00:00.000Z',
    image: '/images/shopping/amazon-picks.jpg',
    category: 'shop',
    comments: [
      {
        id: 's1',
        author: '쇼핑러',
        content: '이 제품들 정말 좋아요!',
        createdAt: '2024-04-23T11:00:00.000Z'
      }
    ]
  },
  'shop-2': {
    id: 'shop-2',
    title: '2024 봄 패션 트렌드',
    author: '패션 에디터',
    content: '<h2>봄 패션 트렌드</h2><p>올 봄 놓치면 후회할 패션 아이템을 소개합니다.</p><h3>핫 아이템</h3><p>파스텔 톤, 와이드 핏, 레이어드 룩 등</p>',
    createdAt: '2024-04-22T10:00:00.000Z',
    image: '/images/shopping/spring-fashion.jpg',
    category: 'shop',
    comments: []
  },
  'food-1': {
    id: 'food-1',
    title: '직장인 한끼 레시피',
    author: '요리 연구가',
    content: '<h2>간단 레시피</h2><p>15분만에 완성하는 든든한 한끼 요리법을 소개합니다.</p><h3>추천 메뉴</h3><p>볶음밥, 파스타, 샐러드 등</p>',
    createdAt: '2024-04-23T10:00:00.000Z',
    image: '/images/food/quick-meal.jpg',
    category: 'food',
    comments: [
      {
        id: 'f1',
        author: '요리사',
        content: '정말 간단하고 맛있어요!',
        createdAt: '2024-04-23T11:00:00.000Z'
      }
    ]
  },
  'food-2': {
    id: 'food-2',
    title: '서울 숨은 맛집 TOP 10',
    author: '푸드 크리틱',
    content: '<h2>로컬 맛집</h2><p>로컬이 추천하는 진짜 맛집을 소개합니다.</p><h3>추천 메뉴</h3><p>전통 음식, 퓨전 요리, 디저트 등</p>',
    createdAt: '2024-04-22T10:00:00.000Z',
    image: '/images/food/seoul-food.jpg',
    category: 'food',
    comments: []
  },
  'hobby-1': {
    id: 'hobby-1',
    title: '주말 캠핑 초보 가이드',
    author: '아웃도어 전문가',
    content: '<h2>캠핑 입문</h2><p>캠핑 입문자를 위한 필수 준비물과 꿀팁을 소개합니다.</p><h3>필수 아이템</h3><p>텐트, 매트, 랜턴, 취사도구 등</p>',
    createdAt: '2024-04-23T10:00:00.000Z',
    image: '/images/hobby/camping-guide.jpg',
    category: 'hobby',
    comments: [
      {
        id: 'h1',
        author: '캠퍼',
        content: '초보자에게 정말 유용한 정보입니다!',
        createdAt: '2024-04-23T11:00:00.000Z'
      }
    ]
  },
  'hobby-2': {
    id: 'hobby-2',
    title: '취미로 시작하는 사진 촬영',
    author: '사진 작가',
    content: '<h2>사진 촬영 기초</h2><p>취미로 시작하는 사진 촬영의 기본을 알아봅니다.</p><h3>촬영 팁</h3><p>구도, 조명, 카메라 설정 등</p>',
    createdAt: '2024-04-22T10:00:00.000Z',
    image: '/images/hobby/photography.jpg',
    category: 'hobby',
    comments: []
  },
  'family-1': {
    id: 'family-1',
    title: '아이와 함께하는 주말 나들이',
    author: '육아 전문가',
    content: '<h2>주말 나들이 추천</h2><p>아이와 함께 즐거운 시간을 보낼 수 있는 주말 나들이 장소를 소개합니다.</p><h3>추천 장소</h3><p>공원, 박물관, 체험학습장 등</p>',
    createdAt: '2024-04-23T10:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'family',
    comments: [
      {
        id: 'f1',
        author: '맘스',
        content: '아이들이 정말 좋아했어요!',
        createdAt: '2024-04-23T11:00:00.000Z'
      }
    ]
  },
  'family-2': {
    id: 'family-2',
    title: '가족 건강 관리 팁',
    author: '가정의학 전문가',
    content: '<h2>가족 건강 관리</h2><p>가족의 건강을 지키기 위한 생활 습관과 관리 방법을 알아봅니다.</p><h3>건강 관리 팁</h3><p>식습관, 운동, 수면 관리 등</p>',
    createdAt: '2024-04-22T10:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'family',
    comments: []
  }
};

// API 함수들
export const getContentById = async (id) => {
  try {
    // 실제 API가 구현되면 여기서 API 호출을 수행할 수 있습니다.
    // 현재는 mock 데이터를 사용합니다.
    const content = mockContents[id];
    
    if (!content) {
      throw new Error('Content not found');
    }
    
    return content;
  } catch (error) {
    console.error('Error fetching content:', error);
    throw error;
  }
};

export const getContents = async () => {
  try {
    // 실제 API가 구현되면 여기서 API 호출을 수행할 수 있습니다.
    // 현재는 mock 데이터를 사용합니다.
    return Object.values(mockContents);
  } catch (error) {
    console.error('Error fetching contents:', error);
    throw error;
  }
};

export const getContentsByCategory = async (category) => {
  try {
    // 실제 API가 구현되면 여기서 API 호출을 수행할 수 있습니다.
    // 현재는 mock 데이터를 사용합니다.
    return Object.values(mockContents).filter(content => content.category === category);
  } catch (error) {
    console.error('Error fetching contents by category:', error);
    throw error;
  }
};

export const addComment = async (contentId, comment, author) => {
  try {
    const content = mockContents[contentId];
    if (!content) {
      throw new Error('Content not found');
    }

    const newComment = {
      id: Date.now().toString(),
      author: author,
      content: comment,
      createdAt: new Date().toISOString()
    };

    if (!content.comments) {
      content.comments = [];
    }
    content.comments.push(newComment);

    return newComment;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}; 