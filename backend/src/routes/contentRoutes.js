const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const auth = require('../middleware/userAuth');

// 모든 컨텐츠 조회
router.get('/', contentController.getAllContents);

// 카테고리별 컨텐츠 조회
router.get('/category/:categoryId', contentController.getContentsByCategory);
router.get('/category/:categoryId/subcategory/:subcategoryId', contentController.getContentsByCategory);

// 특정 컨텐츠 조회
router.get('/:id', contentController.getContentById);

// 자동 콘텐츠 생성
router.post('/generate', contentController.generateContents);

// 컨텐츠 생성 (관리자만)
router.post('/', auth, contentController.createContent);

// 컨텐츠 수정 (관리자만)
router.put('/:id', auth, contentController.updateContent);

// 컨텐츠 삭제 (관리자만)
router.delete('/:id', auth, contentController.deleteContent);

// 댓글 추가
router.post('/:id/comments', auth, contentController.addComment);

// 댓글 수정
router.put('/:contentId/comments/:commentId', auth, contentController.updateComment);

// 댓글 삭제
router.delete('/:contentId/comments/:commentId', auth, contentController.deleteComment);

module.exports = router; 