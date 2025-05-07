const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// 모든 카테고리 조회
router.get('/', categoryController.getCategories);

// 카테고리 생성 (관리자용)
router.post('/', authenticateToken, isAdmin, categoryController.createCategory);

// 카테고리 수정 (관리자용)
router.put('/:id', authenticateToken, isAdmin, categoryController.updateCategory);

// 카테고리 삭제 (관리자용)
router.delete('/:id', authenticateToken, isAdmin, categoryController.deleteCategory);

module.exports = router; 