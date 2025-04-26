const express = require('express');
const router = express.Router();
const Content = require('../models/Content');
const auth = require('../middleware/auth');

// 모든 컨텐츠 조회
router.get('/', async (req, res) => {
  try {
    const contents = await Content.find().sort({ date: -1 });
    res.json(contents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 카테고리별 컨텐츠 조회
router.get('/category/:category', async (req, res) => {
  try {
    const contents = await Content.find({ category: req.params.category }).sort({ date: -1 });
    res.json(contents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 특정 컨텐츠 조회
router.get('/:id', async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
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
});

// 컨텐츠 생성 (관리자만 가능)
router.post('/', auth, async (req, res) => {
  const content = new Content({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image,
    date: req.body.date
  });

  try {
    const newContent = await content.save();
    res.status(201).json(newContent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 컨텐츠 수정 (관리자만 가능)
router.put('/:id', auth, async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: '컨텐츠를 찾을 수 없습니다.' });
    }

    if (req.body.title) content.title = req.body.title;
    if (req.body.description) content.description = req.body.description;
    if (req.body.category) content.category = req.body.category;
    if (req.body.image) content.image = req.body.image;
    if (req.body.date) content.date = req.body.date;

    const updatedContent = await content.save();
    res.json(updatedContent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 컨텐츠 삭제 (관리자만 가능)
router.delete('/:id', auth, async (req, res) => {
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
});

// 댓글 추가
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: '컨텐츠를 찾을 수 없습니다.' });
    }

    const comment = {
      user: req.user.id,
      text: req.body.text,
      date: new Date().toISOString()
    };

    content.comments.push(comment);
    const updatedContent = await content.save();
    res.json(updatedContent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 댓글 수정
router.put('/:id/comments/:commentId', auth, async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: '컨텐츠를 찾을 수 없습니다.' });
    }

    const comment = content.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: '댓글 수정 권한이 없습니다.' });
    }

    comment.text = req.body.text;
    const updatedContent = await content.save();
    res.json(updatedContent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 댓글 삭제
router.delete('/:id/comments/:commentId', auth, async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: '컨텐츠를 찾을 수 없습니다.' });
    }

    const comment = content.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: '댓글 삭제 권한이 없습니다.' });
    }

    comment.remove();
    const updatedContent = await content.save();
    res.json(updatedContent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 