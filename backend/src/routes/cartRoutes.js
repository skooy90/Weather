const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: 장바구니 관리 API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *       properties:
 *         productId:
 *           type: string
 *           description: 제품 ID
 *         quantity:
 *           type: integer
 *           minimum: 1
 *           description: 수량
 *     Cart:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: 사용자 ID
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *         totalPrice:
 *           type: number
 *           description: 총 금액
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     tags: [Cart]
 *     summary: 장바구니 조회
 *     description: 현재 사용자의 장바구니 내용을 조회합니다.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 장바구니 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

/**
 * @swagger
 * /api/cart:
 *   post:
 *     tags: [Cart]
 *     summary: 장바구니에 상품 추가
 *     description: 장바구니에 새로운 상품을 추가하거나 기존 상품의 수량을 변경합니다.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *           example:
 *             productId: "507f1f77bcf86cd799439011"
 *             quantity: 2
 *     responses:
 *       200:
 *         description: 장바구니 업데이트 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

/**
 * @swagger
 * /api/cart/{productId}:
 *   delete:
 *     tags: [Cart]
 *     summary: 장바구니에서 상품 제거
 *     description: 장바구니에서 특정 상품을 제거합니다.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: 제거할 제품의 ID
 *     responses:
 *       200:
 *         description: 상품 제거 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "상품이 장바구니에서 제거되었습니다."
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: 상품을 찾을 수 없음
 */

// 라우트 구현
router.get('/', (req, res) => {
  res.json({
    success: true,
    cart: {
      userId: 'user123',
      items: [],
      totalPrice: 0
    }
  });
});

router.post('/', (req, res) => {
  res.json({
    success: true,
    cart: {
      userId: 'user123',
      items: [req.body],
      totalPrice: 0
    }
  });
});

router.delete('/:productId', (req, res) => {
  res.json({
    success: true,
    message: '상품이 장바구니에서 제거되었습니다.',
    cart: {
      userId: 'user123',
      items: [],
      totalPrice: 0
    }
  });
});

module.exports = router; 