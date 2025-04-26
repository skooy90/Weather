const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

/**
 * @route POST /auth/login
 * @desc 사용자 로그인
 * @access Public
 */
router.post('/login', authController.login);

/**
 * @route POST /auth/register
 * @desc 사용자 회원가입
 * @access Public
 */
router.post('/register', authController.register);

/**
 * @route POST /auth/logout
 * @desc 사용자 로그아웃
 * @access Private
 */
router.post('/logout', authenticateToken, authController.logout);

/**
 * @route GET /auth/me
 * @desc 현재 로그인된 사용자 정보 조회
 * @access Private
 */
router.get('/me', authenticateToken, authController.getCurrentUser);

/**
 * @route PUT /auth/password
 * @desc 비밀번호 변경
 * @access Private
 */
router.put('/password', authenticateToken, authController.changePassword);

/**
 * @route PUT /auth/profile
 * @desc 프로필 정보 수정
 * @access Private
 */
router.put('/profile', authenticateToken, authController.updateProfile);

module.exports = router; 