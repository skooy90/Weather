const express = require('express');
const router = express.Router();
const productDetailController = require('../controllers/productDetailController');
const auth = require('../middleware/userAuth');

// 상품 상세 정보 생성 (인증 필요)
router.post('/', auth, productDetailController.createProductDetail);

// 상품 상세 정보 조회
router.get('/:productId', productDetailController.getProductDetail);

// 상품 상세 정보 업데이트 (인증 필요)
router.put('/:productId', auth, productDetailController.updateProductDetail);

// 리뷰 추가 (인증 필요)
router.post('/:productId/reviews', auth, productDetailController.addReview);

// 질문 추가 (인증 필요)
router.post('/:productId/questions', auth, productDetailController.addQuestion);

module.exports = router; 