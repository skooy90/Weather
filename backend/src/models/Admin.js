const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'editor', 'viewer'],
    default: 'viewer'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  lastLogin: {
    type: Date
  },
  loginAttempts: {
    type: Number,
    default: 0
  },
  lastFailedLogin: {
    type: Date
  },
  ipWhitelist: [{
    type: String
  }],
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  twoFactorSecret: {
    type: String
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
  timestamps: true
});

// 로그인 시도 횟수 초기화
adminSchema.methods.resetLoginAttempts = function() {
  this.loginAttempts = 0;
  this.lastFailedLogin = null;
  return this.save();
};

// 로그인 실패 기록
adminSchema.methods.recordFailedLogin = function() {
  this.loginAttempts += 1;
  this.lastFailedLogin = new Date();
  return this.save();
};

module.exports = mongoose.model('Admin', adminSchema); 