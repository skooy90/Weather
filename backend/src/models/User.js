const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * 사용자 모델 스키마
 * @description 사용자 정보를 관리하는 MongoDB 스키마
 */
const userSchema = new mongoose.Schema({
  // 기본 식별 정보
  userId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
    comment: '사용자 고유 식별자'
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    index: true,
    comment: '사용자 로그인 ID'
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true,
    comment: '사용자 이메일'
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
    comment: '암호화된 비밀번호'
  },

  // 권한 및 상태
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    index: true,
    comment: '사용자 권한'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active',
    index: true,
    comment: '계정 상태'
  },

  // 프로필 정보
  profile: {
    name: {
      type: String,
      trim: true,
      comment: '사용자 표시 이름'
    },
    bio: {
      type: String,
      trim: true,
      comment: '자기소개'
    },
    avatar: {
      type: String,
      trim: true,
      comment: '프로필 이미지 URL'
    },
    language: {
      type: String,
      enum: ['ko', 'en', 'ja'],
      default: 'ko',
      comment: '사용자 선호 언어'
    }
  },

  // 환경 설정
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light',
      comment: '테마 설정'
    },
    notifications: {
      email: { 
        type: Boolean, 
        default: true,
        comment: '이메일 알림 설정'
      },
      push: { 
        type: Boolean, 
        default: true,
        comment: '푸시 알림 설정'
      }
    }
  },

  // 보안 관련
  lastLogin: {
    type: Date,
    default: null,
    comment: '마지막 로그인 시간'
  },
  loginAttempts: {
    type: Number,
    default: 0,
    comment: '로그인 시도 횟수'
  },
  lockUntil: {
    type: Date,
    default: null,
    comment: '계정 잠금 해제 시간'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      // 민감한 정보 제거
      delete ret.password;
      delete ret.loginAttempts;
      delete ret.lockUntil;
      return ret;
    }
  }
});

/**
 * 비밀번호 해싱 미들웨어
 * @description 사용자 저장 전 비밀번호를 해싱
 */
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * 비밀번호 검증 메서드
 * @param {string} candidatePassword - 검증할 비밀번호
 * @returns {Promise<boolean>} 비밀번호 일치 여부
 */
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

/**
 * 로그인 시도 횟수 증가 메서드
 * @description 5회 이상 실패 시 계정 잠금
 */
userSchema.methods.incrementLoginAttempts = async function() {
  this.loginAttempts += 1;
  if (this.loginAttempts >= 5) {
    this.lockUntil = new Date(Date.now() + 30 * 60 * 1000); // 30분 동안 잠금
  }
  await this.save();
};

/**
 * 계정 잠금 해제 메서드
 * @description 로그인 성공 시 호출
 */
userSchema.methods.resetLoginAttempts = async function() {
  this.loginAttempts = 0;
  this.lockUntil = null;
  await this.save();
};

/**
 * 계정 잠금 상태 확인 메서드
 * @returns {boolean} 계정 잠금 여부
 */
userSchema.methods.isLocked = function() {
  return this.lockUntil && this.lockUntil > Date.now();
};

const User = mongoose.model('User', userSchema);

module.exports = User; 