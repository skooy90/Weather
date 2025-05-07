const mongoose = require('mongoose');
const Content = require('../models/Content');
const Category = require('../models/Category');

// 카테고리 매핑 정의
const categoryMapping = {
  'all': 'trending',  // 'all' 카테고리를 'trending'으로 변경
  'trending': 'trending',
  'lifestyle': 'lifestyle',
  'shopping': 'shopping',
  'food': 'food',
  'hobby': 'hobby',
  'tech': 'tech',
  'family': 'family'
};

// 카테고리 초기화 함수
async function initializeCategories() {
  try {
    // 기존 카테고리 삭제
    await Category.deleteMany({});
    
    // 새로운 카테고리 생성
    const categories = [
      {
        name: 'trending',
        name_kr: '인기',
        description: '인기 있는 콘텐츠',
        subcategories: []
      },
      {
        name: 'lifestyle',
        name_kr: '라이프스타일',
        description: '일상과 관련된 콘텐츠',
        subcategories: ['패션', '뷰티', '건강', '여행']
      },
      {
        name: 'shopping',
        name_kr: '쇼핑',
        description: '쇼핑 관련 콘텐츠',
        subcategories: ['온라인쇼핑', '오프라인쇼핑', '리뷰', '추천']
      },
      {
        name: 'food',
        name_kr: '음식',
        description: '음식 관련 콘텐츠',
        subcategories: ['레시피', '맛집', '음식문화', '건강식']
      },
      {
        name: 'hobby',
        name_kr: '취미',
        description: '취미 관련 콘텐츠',
        subcategories: ['운동', '독서', '게임', '공예']
      },
      {
        name: 'tech',
        name_kr: '기술',
        description: '기술 관련 콘텐츠',
        subcategories: ['IT', '가전', '모바일', '인터넷']
      },
      {
        name: 'family',
        name_kr: '가족',
        description: '가족 관련 콘텐츠',
        subcategories: ['육아', '교육', '가정', '반려동물']
      }
    ];

    await Category.insertMany(categories);
    console.log('카테고리 초기화 완료');
  } catch (error) {
    console.error('카테고리 초기화 중 오류:', error);
    throw error;
  }
}

// 콘텐츠 마이그레이션 함수
async function migrateCategories() {
  try {
    console.log('카테고리 마이그레이션 시작...');
    
    // MongoDB 연결
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB 연결 성공');

    const stats = {
      total: 0,
      updated: 0,
      errors: []
    };

    // 모든 콘텐츠 조회
    const contents = await Content.find({});
    stats.total = contents.length;
    console.log(`총 ${stats.total}개의 콘텐츠 처리 시작`);

    // 각 콘텐츠 처리
    for (const content of contents) {
      try {
        // 카테고리 매핑
        const newCategory = categoryMapping[content.category] || 'trending';
        
        // description이 없는 경우 기본값 설정
        if (!content.description) {
          content.description = `${content.title}에 대한 콘텐츠`;
        }

        // 콘텐츠 업데이트
        await Content.findByIdAndUpdate(
          content._id,
          {
            category: newCategory,
            description: content.description
          },
          { runValidators: true }
        );
        
        stats.updated++;
      } catch (error) {
        stats.errors.push({
          contentId: content._id,
          error: error.message
        });
      }
    }

    // 카테고리 초기화
    await initializeCategories();

    // 결과 보고
    console.log('\n=== 마이그레이션 결과 ===');
    console.log(`총 콘텐츠: ${stats.total}`);
    console.log(`업데이트 성공: ${stats.updated}`);
    
    if (stats.errors.length > 0) {
      console.log('\n=== 오류 발생 콘텐츠 ===');
      stats.errors.forEach(error => {
        console.log(`Content ID: ${error.contentId}`);
        console.log(`Error: ${error.error}\n`);
      });
    }

    return true;
  } catch (error) {
    console.error('마이그레이션 중 오류 발생:', error);
    return false;
  } finally {
    await mongoose.disconnect();
  }
}

// 스크립트 실행
if (require.main === module) {
  migrateCategories()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('예상치 못한 오류:', error);
      process.exit(1);
    });
}

module.exports = migrateCategories; 