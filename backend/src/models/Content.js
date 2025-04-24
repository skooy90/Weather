const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['trend', 'life', 'tech', 'family']
  },
  image: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [{
    author: String,
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['게시', '숨김', '삭제'],
      default: '게시'
    }
  }]
});

module.exports = mongoose.model('Content', contentSchema); 