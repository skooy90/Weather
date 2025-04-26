const Content = require('../models/Content');
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
const axios = require('axios');

// 모든 컨텐츠 조회
exports.getAllContents = async (req, res) => {
  try {
    const contents = await Content.find()
      .populate('category', 'name')
      .populate('subcategory', 'name')
      .sort({ createdAt: -1 });
    res.json(contents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 카테고리별 컨텐츠 조회
exports.getContentsByCategory = async (req, res) => {
  try {
    const { categoryId, subcategoryId } = req.params;
    let query = {};

    if (categoryId) {
      query.category = categoryId;
    }
    if (subcategoryId) {
      query.subcategory = subcategoryId;
    }

    const contents = await Content.find(query)
      .populate('category', 'name')
      .populate('subcategory', 'name')
      .sort({ createdAt: -1 });
    res.json(contents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 특정 컨텐츠 조회
exports.getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id)
      .populate('category', 'name')
      .populate('subcategory', 'name');
    
    if (!content) {
      return res.status(404).json({ message: '컨텐츠를 찾을 수 없습니다.' });
    }

    // 조회수 증가
    content.views += 1;
    await content.save();
    
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 자동 콘텐츠 생성
exports.generateContents = async (req, res) => {
  try {
    const categories = {
      trend: {
        name: '요즘 뜨는 트렌드',
        subcategories: ['오늘의 인기글', '실시간 많이 본 콘텐츠', 'AI 추천 콘텐츠', '이번 주 이슈 모음']
      },
      lifestyle: {
        name: '라이프 스타일',
        subcategories: ['일상 브이로그', '재테크 & 돈 버는 꿀팁', '건강 & 운동', '가족 & 육아', '자기계발 & 공부법', '퇴근 후 힐링 콘텐츠']
      },
      shopping: {
        name: '쇼핑 & 소비 생활',
        subcategories: ['뷰티 / 패션', '디지털 기기 리뷰', '주방 / 생활용품', '쿠팡 추천템', '가성비/가심비 콘텐츠']
      },
      food: {
        name: '먹거리',
        subcategories: ['오늘 뭐 먹지?', '집밥 레시피', '맛집 리뷰', '디저트 / 간식 / 카페']
      }
    };

    const generatedContents = [];

    for (const [category, info] of Object.entries(categories)) {
      for (const subcategory of info.subcategories) {
        // 각 서브카테고리별로 2개의 콘텐츠 생성
        for (let i = 0; i < 2; i++) {
          const content = new Content({
            title: `${subcategory} 관련 유용한 정보 ${i + 1}`,
            author: '시스템',
            content: generateContentBySubcategory(subcategory),
            category: category,
            subcategory: subcategory,
            image: `https://source.unsplash.com/random/800x600/?${category}`,
            views: Math.floor(Math.random() * 1000),
            likes: Math.floor(Math.random() * 100),
            comments: [],
            tags: generateTagsBySubcategory(subcategory),
            createdAt: new Date()
          });

          await content.save();
          generatedContents.push(content);
        }
      }
    }

    res.status(201).json({
      message: `${generatedContents.length}개의 콘텐츠가 생성되었습니다.`,
      contents: generatedContents
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 서브카테고리별 콘텐츠 생성
const generateContentBySubcategory = (subcategory) => {
  const contentTemplates = {
    '오늘의 인기글': {
      title: '실시간 인기 콘텐츠',
      content: '<h2>오늘 가장 인기있는 콘텐츠</h2><p>실시간으로 업데이트되는 인기 콘텐츠를 확인해보세요.</p>'
    },
    '일상 브이로그': {
      title: '일상 공유',
      content: '<h2>일상 브이로그</h2><p>다양한 사람들의 일상을 공유합니다.</p>'
    },
    '재테크 & 돈 버는 꿀팁': {
      title: '재테크 정보',
      content: '<h2>재테크 꿀팁</h2><p>효율적인 재테크 방법을 알아보세요.</p>'
    },
    // ... 다른 서브카테고리에 대한 템플릿 추가
  };

  return contentTemplates[subcategory]?.content || '<h2>기본 콘텐츠</h2><p>콘텐츠 내용입니다.</p>';
};

// 서브카테고리별 태그 생성
const generateTagsBySubcategory = (subcategory) => {
  const tagTemplates = {
    '오늘의 인기글': ['인기', '트렌드', '실시간'],
    '일상 브이로그': ['일상', '브이로그', '공유'],
    '재테크 & 돈 버는 꿀팁': ['재테크', '투자', '부업'],
    // ... 다른 서브카테고리에 대한 태그 추가
  };

  return tagTemplates[subcategory] || ['기본', '태그'];
};

// 컨텐츠 생성
exports.createContent = async (req, res) => {
  try {
    // 카테고리와 서브카테고리 존재 여부 확인
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(404).json({ message: '카테고리를 찾을 수 없습니다.' });
    }

    const subcategory = await Subcategory.findById(req.body.subcategory);
    if (!subcategory) {
      return res.status(404).json({ message: '서브카테고리를 찾을 수 없습니다.' });
    }

    // 서브카테고리가 해당 카테고리에 속하는지 확인
    if (subcategory.category.toString() !== category._id.toString()) {
      return res.status(400).json({ message: '서브카테고리가 해당 카테고리에 속하지 않습니다.' });
    }

    const content = new Content({
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
      category: req.body.category,
      subcategory: req.body.subcategory,
      image: req.body.image,
      tags: req.body.tags || []
    });

    const newContent = await content.save();
    res.status(201).json(newContent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 컨텐츠 수정
exports.updateContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: '컨텐츠를 찾을 수 없습니다.' });
    }

    // 카테고리와 서브카테고리 존재 여부 확인
    if (req.body.category) {
      const category = await Category.findById(req.body.category);
      if (!category) {
        return res.status(404).json({ message: '카테고리를 찾을 수 없습니다.' });
      }
    }

    if (req.body.subcategory) {
      const subcategory = await Subcategory.findById(req.body.subcategory);
      if (!subcategory) {
        return res.status(404).json({ message: '서브카테고리를 찾을 수 없습니다.' });
      }

      // 서브카테고리가 해당 카테고리에 속하는지 확인
      if (req.body.category && subcategory.category.toString() !== req.body.category) {
        return res.status(400).json({ message: '서브카테고리가 해당 카테고리에 속하지 않습니다.' });
      }
    }

    // 컨텐츠 업데이트
    Object.keys(req.body).forEach(key => {
      if (key !== '_id' && key !== '__v') {
        content[key] = req.body[key];
      }
    });

    const updatedContent = await content.save();
    res.json(updatedContent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 컨텐츠 삭제
exports.deleteContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: '컨텐츠를 찾을 수 없습니다.' });
    }

    await content.remove();
    res.json({ message: '컨텐츠가 삭제되었습니다.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 댓글 추가
exports.addComment = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: '컨텐츠를 찾을 수 없습니다.' });
    }

    const comment = {
      author: req.body.author,
      content: req.body.content,
      createdAt: new Date()
    };

    content.comments.push(comment);
    const updatedContent = await content.save();
    res.json(updatedContent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 댓글 수정
exports.updateComment = async (req, res) => {
  try {
    const content = await Content.findById(req.params.contentId);
    if (!content) {
      return res.status(404).json({ message: '컨텐츠를 찾을 수 없습니다.' });
    }

    const comment = content.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
    }

    comment.content = req.body.content;
    const updatedContent = await content.save();
    res.json(updatedContent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 댓글 삭제
exports.deleteComment = async (req, res) => {
  try {
    const content = await Content.findById(req.params.contentId);
    if (!content) {
      return res.status(404).json({ message: '컨텐츠를 찾을 수 없습니다.' });
    }

    const comment = content.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
    }

    comment.remove();
    const updatedContent = await content.save();
    res.json(updatedContent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}; 