const express = require('express');
const router = express.Router();
const Content = require('../models/Content');
const { authenticateToken } = require('../middleware/auth');

// 전체 콘텐츠 조회
router.get('/', async (req, res) => {
  try {
    const contents = await Content.find()
      .sort({ createdAt: -1 })
      .populate('author', 'username');
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 카테고리별 콘텐츠 조회
router.get('/category/:category', async (req, res) => {
  try {
    const contents = await Content.find({ category: req.params.category })
      .sort({ createdAt: -1 })
      .populate('author', 'username');
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 서브카테고리별 콘텐츠 조회
router.get('/category/:category/subcategory/:subcategory', async (req, res) => {
  try {
    const contents = await Content.find({
      category: req.params.category,
      subcategory: req.params.subcategory
    })
      .sort({ createdAt: -1 })
      .populate('author', 'username');
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 콘텐츠 검색
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    const contents = await Content.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    })
      .sort({ createdAt: -1 })
      .populate('author', 'username');
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 좋아요 처리
router.post('/:id/like', authenticateToken, async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: '콘텐츠를 찾을 수 없습니다.' });
    }

    content.likes += 1;
    await content.save();
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 