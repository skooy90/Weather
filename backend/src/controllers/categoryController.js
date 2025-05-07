const Category = require('../models/Category');

// 모든 카테고리 조회
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ order: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 카테고리 생성 (관리자용)
exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 카테고리 수정 (관리자용)
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    
    if (!category) {
      return res.status(404).json({ message: '카테고리를 찾을 수 없습니다.' });
    }

    Object.assign(category, req.body);
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 카테고리 삭제 (관리자용)
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    
    if (!category) {
      return res.status(404).json({ message: '카테고리를 찾을 수 없습니다.' });
    }

    await category.remove();
    res.json({ message: '카테고리가 삭제되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 초기 카테고리 데이터 생성 (시드 데이터)
exports.initializeCategories = async () => {
  try {
    const defaultCategories = [
      {
        name: 'trending',
        name_kr: '인기',
        order: 0,
        subcategories: []
      },
      {
        name: 'lifestyle',
        name_kr: '라이프스타일',
        order: 1,
        subcategories: ['일상', '뷰티', '패션', '건강']
      },
      {
        name: 'shopping',
        name_kr: '쇼핑',
        order: 2,
        subcategories: ['온라인쇼핑', '오프라인쇼핑', '리뷰', '추천']
      },
      {
        name: 'food',
        name_kr: '음식',
        order: 3,
        subcategories: ['레시피', '맛집', '음료', '디저트']
      },
      {
        name: 'hobby',
        name_kr: '취미',
        order: 4,
        subcategories: ['여행', '독서', '게임', '운동']
      },
      {
        name: 'tech',
        name_kr: '기술',
        order: 5,
        subcategories: ['IT', '가전', '모바일', 'AI']
      },
      {
        name: 'family',
        name_kr: '가족',
        order: 6,
        subcategories: ['육아', '반려동물', '가사', '교육']
      }
    ];

    await Category.deleteMany({}); // 기존 카테고리 삭제
    await Category.insertMany(defaultCategories); // 새로운 카테고리 추가
    
    console.log('카테고리 초기화 완료');
  } catch (error) {
    console.error('카테고리 초기화 실패:', error);
  }
}; 