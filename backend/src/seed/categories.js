const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');

const categories = [
  {
    name: '뉴스',
    description: '최신 뉴스와 시사 정보',
    subcategories: [
      { name: '정치', description: '정치 관련 뉴스' },
      { name: '경제', description: '경제 관련 뉴스' },
      { name: '사회', description: '사회 관련 뉴스' }
    ]
  },
  {
    name: '엔터테인먼트',
    description: '연예, 영화, 음악 등 엔터테인먼트 정보',
    subcategories: [
      { name: '영화', description: '영화 관련 정보' },
      { name: '음악', description: '음악 관련 정보' },
      { name: '연예인', description: '연예인 관련 정보' }
    ]
  },
  {
    name: '스포츠',
    description: '스포츠 관련 정보',
    subcategories: [
      { name: '축구', description: '축구 관련 정보' },
      { name: '야구', description: '야구 관련 정보' },
      { name: '농구', description: '농구 관련 정보' }
    ]
  },
  {
    name: '기술',
    description: '기술 및 IT 관련 정보',
    subcategories: [
      { name: '모바일', description: '모바일 관련 정보' },
      { name: '컴퓨터', description: '컴퓨터 관련 정보' },
      { name: '인터넷', description: '인터넷 관련 정보' }
    ]
  }
];

const seedCategories = async () => {
  try {
    // 기존 데이터 삭제
    await Subcategory.deleteMany({});
    await Category.deleteMany({});
    
    // 카테고리 및 서브카테고리 생성
    for (const categoryData of categories) {
      const category = new Category({
        name: categoryData.name,
        description: categoryData.description
      });
      
      await category.save();
      
      // 서브카테고리 생성
      for (const subcategoryData of categoryData.subcategories) {
        const subcategory = new Subcategory({
          name: subcategoryData.name,
          description: subcategoryData.description,
          category: category._id
        });
        
        await subcategory.save();
        category.subcategories.push(subcategory._id);
      }
      
      await category.save();
    }
    
    console.log('카테고리 시드 데이터 생성 완료');
  } catch (error) {
    console.error('카테고리 시드 데이터 생성 실패:', error);
    throw error;
  }
};

module.exports = seedCategories; 