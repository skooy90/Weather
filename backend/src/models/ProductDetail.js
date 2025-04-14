const mongoose = require('mongoose');

const productDetailSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  specifications: {
    type: Map,
    of: String,
    required: true
  },
  features: [{
    title: String,
    description: String
  }],
  images: [{
    url: String,
    alt: String
  }],
  reviews: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  questions: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    question: String,
    answer: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  warranty: {
    period: String,
    terms: String
  },
  shipping: {
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    restrictions: [String]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ProductDetail', productDetailSchema); 