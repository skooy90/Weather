const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['ai-tech', 'digital-nomad', 'self-improvement', 'side-hustle', 'outdoor']
  },
  image: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
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
    user: String,
    text: String,
    date: String
  }]
});

module.exports = mongoose.model('Content', contentSchema); 