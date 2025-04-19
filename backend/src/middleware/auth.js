const { verifyToken } = require('../utils/jwt');

const auth = async (req, res, next) => {
  try {
    // 헤더에서 토큰 추출
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: '인증 토큰이 필요합니다.'
      });
    }

    // 토큰 검증
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: '유효하지 않은 토큰입니다.'
      });
    }

    // 요청 객체에 사용자 정보 추가
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: '인증에 실패했습니다.'
    });
  }
};

module.exports = auth; 