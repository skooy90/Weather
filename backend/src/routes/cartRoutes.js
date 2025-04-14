const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: 장바구니 목록 조회
 *     responses:
 *       200:
 *         description: 장바구니 목록
 */
router.get('/', (req, res) => {
  res.json({ message: '장바구니 목록 조회' });
});

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: 장바구니에 상품 추가
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: 상품이 장바구니에 추가됨
 */
router.post('/', (req, res) => {
  res.json({ message: '장바구니에 상품 추가' });
});

/**
 * @swagger
 * /api/cart/{id}:
 *   delete:
 *     summary: 장바구니에서 상품 제거
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 상품이 장바구니에서 제거됨
 */
router.delete('/:id', (req, res) => {
  res.json({ message: '장바구니에서 상품 제거' });
});

module.exports = router; 