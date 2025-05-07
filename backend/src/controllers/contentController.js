const Content = require('../models/Content');
const { validateObjectId } = require('../utils/validation');

// 모든 콘텐츠 조회
exports.getContents = async (req, res) => {
  try {
    const contents = await Content.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 카테고리별 콘텐츠 조회
exports.getContentsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const contents = await Content.find({ category })
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 서브카테고리별 콘텐츠 조회
exports.getContentsBySubcategory = async (req, res) => {
  try {
    const { category, subcategory } = req.params;
    const contents = await Content.find({ 
      category,
      subcategory: subcategory === 'all' ? { $exists: true } : subcategory
    })
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 인기 콘텐츠 조회
exports.getTrendingContents = async (req, res) => {
  try {
    const contents = await Content.find()
      .populate('author', 'username')
      .sort({ likes: -1 })
      .limit(6);
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 콘텐츠 상세 조회
exports.getContentById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!validateObjectId(id)) {
      return res.status(400).json({ message: '유효하지 않은 콘텐츠 ID입니다.' });
    }

    const content = await Content.findById(id).populate('author', 'username');
    if (!content) {
      return res.status(404).json({ message: '콘텐츠를 찾을 수 없습니다.' });
    }

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 콘텐츠 생성
exports.createContent = async (req, res) => {
  try {
    const content = new Content({
      ...req.body,
      author: req.user._id
    });
    const savedContent = await content.save();
    res.status(201).json(savedContent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 콘텐츠 수정
exports.updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!validateObjectId(id)) {
      return res.status(400).json({ message: '유효하지 않은 콘텐츠 ID입니다.' });
    }

    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({ message: '콘텐츠를 찾을 수 없습니다.' });
    }

    if (content.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: '콘텐츠를 수정할 권한이 없습니다.' });
    }

    Object.assign(content, req.body);
    const updatedContent = await content.save();
    res.json(updatedContent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 콘텐츠 삭제
exports.deleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!validateObjectId(id)) {
      return res.status(400).json({ message: '유효하지 않은 콘텐츠 ID입니다.' });
    }

    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({ message: '콘텐츠를 찾을 수 없습니다.' });
    }

    if (content.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: '콘텐츠를 삭제할 권한이 없습니다.' });
    }

    await content.remove();
    res.json({ message: '콘텐츠가 삭제되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 좋아요 처리
exports.likeContent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!validateObjectId(id)) {
      return res.status(400).json({ message: '유효하지 않은 콘텐츠 ID입니다.' });
    }

    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({ message: '콘텐츠를 찾을 수 없습니다.' });
    }

    content.likes += 1;
    await content.save();
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 