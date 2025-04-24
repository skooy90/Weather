const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/userAuth');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: 제품 관리 API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: 제품 ID
 *         name:
 *           type: string
 *           description: 제품 이름
 *         price:
 *           type: number
 *           description: 제품 가격
 *         description:
 *           type: string
 *           description: 제품 설명
 *         imageUrl:
 *           type: string
 *           description: 제품 이미지 URL
 *         category:
 *           type: string
 *           description: 제품 카테고리
 *         stock:
 *           type: integer
 *           description: 재고 수량
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags: [Products]
 *     summary: 전체 제품 목록 조회
 *     description: 모든 제품의 목록을 반환합니다.
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: 카테고리별 필터링
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 페이지 번호
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: 페이지당 항목 수
 *     responses:
 *       200:
 *         description: 제품 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 total:
 *                   type: integer
 *                   description: 전체 제품 수
 *                 page:
 *                   type: integer
 *                   description: 현재 페이지
 *                 pages:
 *                   type: integer
 *                   description: 전체 페이지 수
 */
router.get('/', productController.getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: 개별 제품 조회
 *     description: 제품 ID로 특정 제품의 상세 정보를 조회합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 제품 ID
 *     responses:
 *       200:
 *         description: 제품 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: 제품을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "제품을 찾을 수 없습니다."
 */
router.get('/:id', productController.getProduct);

/**
 * @swagger
 * /api/products:
 *   post:
 *     tags: [Products]
 *     summary: 새 제품 등록
 *     description: 새로운 제품을 등록합니다.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: 제품 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/', auth, productController.createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     tags: [Products]
 *     summary: 제품 정보 수정
 *     description: 특정 제품의 정보를 수정합니다.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 제품 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: 제품 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: 제품을 찾을 수 없음
 */
router.put('/:id', auth, productController.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     tags: [Products]
 *     summary: 제품 삭제
 *     description: 특정 제품을 삭제합니다.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 제품 ID
 *     responses:
 *       200:
 *         description: 제품 삭제 성공
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
 *                   example: "제품이 성공적으로 삭제되었습니다."
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: 제품을 찾을 수 없음
 */
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router; 