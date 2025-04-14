const express = require('express');
const router = express.Router();
const productDetailController = require('../controllers/productDetailController');

// 상품 상세 정보 생성
router.post('/', productDetailController.createProductDetail);

// 상품 상세 정보 조회
router.get('/:productId', productDetailController.getProductDetail);

// 상품 상세 정보 업데이트
router.put('/:productId', productDetailController.updateProductDetail);

// 리뷰 추가
router.post('/:productId/reviews', productDetailController.addReview);

// 질문 추가
router.post('/:productId/questions', productDetailController.addQuestion);

module.exports = router; 