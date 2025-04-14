const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: 사용자 회원가입
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 회원가입 성공
 */
router.post('/register', (req, res) => {
  res.json({ message: '회원가입 성공' });
});

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: 사용자 로그인
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 로그인 성공
 */
router.post('/login', (req, res) => {
  res.json({ message: '로그인 성공' });
});

module.exports = router; 