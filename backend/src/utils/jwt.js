const jwt = require('jsonwebtoken');

// JWT 토큰 생성
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// JWT 토큰 검증
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// 토큰에서 사용자 ID 추출
const getUserIdFromToken = (token) => {
  const decoded = verifyToken(token);
  return decoded ? decoded.userId : null;
};

module.exports = {
  generateToken,
  verifyToken,
  getUserIdFromToken
}; 