const Content = require('../models/Content');

// 모든 컨텐츠 조회
exports.getAllContents = async (req, res) => {
  try {
    const contents = await Content.find().sort({ createdAt: -1 });
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 카테고리별 컨텐츠 조회
exports.getContentsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const contents = await Content.find({ category }).sort({ createdAt: -1 });
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 특정 컨텐츠 조회
exports.getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: '컨텐츠를 찾을 수 없습니다.' });
    }
    content.views += 1;
    await content.save();
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 컨텐츠 생성
exports.createContent = async (req, res) => {
  try {
    const content = new Content(req.body);
    const savedContent = await content.save();
    res.status(201).json(savedContent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 컨텐츠 수정
exports.updateContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!content) {
      return res.status(404).json({ message: '컨텐츠를 찾을 수 없습니다.' });
    }
    res.json(content);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 컨텐츠 삭제
exports.deleteContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    if (!content) {
      return res.status(404).json({ message: '컨텐츠를 찾을 수 없습니다.' });
    }
    res.json({ message: '컨텐츠가 삭제되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 댓글 추가
exports.addComment = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: '컨텐츠를 찾을 수 없습니다.' });
    }
    content.comments.push(req.body);
    await content.save();
    res.status(201).json(content);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 댓글 수정
exports.updateComment = async (req, res) => {
  try {
    const { contentId, commentId } = req.params;
    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ message: '컨텐츠를 찾을 수 없습니다.' });
    }
    const comment = content.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
    }
    Object.assign(comment, req.body);
    await content.save();
    res.json(content);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 댓글 삭제
exports.deleteComment = async (req, res) => {
  try {
    const { contentId, commentId } = req.params;
    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ message: '컨텐츠를 찾을 수 없습니다.' });
    }
    content.comments.id(commentId).remove();
    await content.save();
    res.json(content);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 