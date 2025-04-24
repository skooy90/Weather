const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * 사용자 로그인
 */
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 사용자 찾기
    const user = await User.findOne({ username }).select('+password');
    if (!user) {
      return res.status(401).json({ message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
    }

    // 계정 잠금 확인
    if (user.isLocked()) {
      return res.status(403).json({ 
        message: '계정이 잠겼습니다. 30분 후에 다시 시도해주세요.' 
      });
    }

    // 비밀번호 확인
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      await user.incrementLoginAttempts();
      return res.status(401).json({ message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
    }

    // 로그인 성공 시 시도 횟수 초기화
    await user.resetLoginAttempts();
    user.lastLogin = new Date();
    await user.save();

    // JWT 토큰 생성
    const token = jwt.sign(
      { userId: user.userId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // 응답에서 민감한 정보 제거
    const userResponse = user.toJSON();

    res.json({
      token,
      user: userResponse
    });
  } catch (error) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

/**
 * 사용자 회원가입
 */
exports.register = async (req, res) => {
  try {
    const { username, email, password, profile } = req.body;

    // 중복 확인
    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }] 
    });
    if (existingUser) {
      return res.status(400).json({ 
        message: '이미 사용 중인 아이디 또는 이메일입니다.' 
      });
    }

    // 새 사용자 생성
    const user = new User({
      userId: `user_${Date.now()}`,
      username,
      email,
      password,
      profile
    });

    await user.save();

    // JWT 토큰 생성
    const token = jwt.sign(
      { userId: user.userId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // 응답에서 민감한 정보 제거
    const userResponse = user.toJSON();

    res.status(201).json({
      token,
      user: userResponse
    });
  } catch (error) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

/**
 * 사용자 로그아웃
 */
exports.logout = (req, res) => {
  res.json({ message: '로그아웃되었습니다.' });
};

/**
 * 현재 로그인된 사용자 정보 조회
 */
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

/**
 * 비밀번호 변경
 */
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.userId).select('+password');

    // 현재 비밀번호 확인
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: '현재 비밀번호가 일치하지 않습니다.' });
    }

    // 새 비밀번호 설정
    user.password = newPassword;
    await user.save();

    res.json({ message: '비밀번호가 변경되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

/**
 * 프로필 정보 수정
 */
exports.updateProfile = async (req, res) => {
  try {
    const { name, bio, avatar, language } = req.body;
    const user = await User.findById(req.user.userId);

    // 프로필 정보 업데이트
    user.profile = {
      ...user.profile,
      name: name || user.profile.name,
      bio: bio || user.profile.bio,
      avatar: avatar || user.profile.avatar,
      language: language || user.profile.language
    };

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

exports.signup = async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;

    // 이메일 중복 체크
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: '이미 사용 중인 이메일입니다.' });
    }

    // 전화번호 중복 체크
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({ message: '이미 사용 중인 전화번호입니다.' });
    }

    // 새 사용자 생성
    const user = new User({
      email,
      password,
      name,
      phone
    });

    await user.save();

    res.status(201).json({
      message: '회원가입이 완료되었습니다.',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('회원가입 에러:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
}; 