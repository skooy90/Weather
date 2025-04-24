const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const { authenticateAdmin, authorizeRole } = require('../middleware/auth');

// 관리자 로그인
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      await admin.recordFailedLogin();
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (admin.status !== 'active') {
      return res.status(403).json({ message: 'Account is not active' });
    }

    await admin.resetLoginAttempts();
    admin.lastLogin = new Date();
    await admin.save();

    const token = admin.generateAuthToken();
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 관리자 목록 조회
router.get('/admins', authenticateAdmin, authorizeRole(['admin']), async (req, res) => {
  try {
    const admins = await Admin.find().select('-password -twoFactorSecret');
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 관리자 생성
router.post('/admins', authenticateAdmin, authorizeRole(['admin']), async (req, res) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();
    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 관리자 정보 수정
router.put('/admins/:id', authenticateAdmin, authorizeRole(['admin']), async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select('-password -twoFactorSecret');
    
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    
    res.json(admin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 관리자 삭제
router.delete('/admins/:id', authenticateAdmin, authorizeRole(['admin']), async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json({ message: 'Admin deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 2단계 인증 설정
router.post('/admins/:id/2fa', authenticateAdmin, async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const { secret, code } = req.body;
    // 2FA 검증 로직
    const isValid = verify2FACode(secret, code);
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid 2FA code' });
    }

    admin.twoFactorEnabled = true;
    admin.twoFactorSecret = secret;
    await admin.save();

    res.json({ message: '2FA enabled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 