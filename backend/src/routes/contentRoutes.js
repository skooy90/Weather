const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const { authenticateToken } = require('../middleware/auth');

// 모든 콘텐츠 조회
router.get('/', contentController.getContents);

// 카테고리별 콘텐츠 조회
router.get('/category/:category', contentController.getContentsByCategory);

// 서브카테고리별 콘텐츠 조회
router.get('/category/:category/subcategory/:subcategory', contentController.getContentsBySubcategory);

// 인기 콘텐츠 조회
router.get('/trending', contentController.getTrendingContents);

// 콘텐츠 상세 조회
router.get('/:id', contentController.getContentById);

// 콘텐츠 생성 (인증 필요)
router.post('/', authenticateToken, contentController.createContent);

// 콘텐츠 수정 (인증 필요)
router.put('/:id', authenticateToken, contentController.updateContent);

// 콘텐츠 삭제 (인증 필요)
router.delete('/:id', authenticateToken, contentController.deleteContent);

// 좋아요 처리 (인증 필요)
router.post('/:id/like', authenticateToken, contentController.likeContent);

module.exports = router; 