const ProductDetail = require('../models/ProductDetail');

// 상품 상세 정보 생성
exports.createProductDetail = async (req, res) => {
  try {
    const productDetail = new ProductDetail(req.body);
    await productDetail.save();
    res.status(201).json(productDetail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 상품 상세 정보 조회
exports.getProductDetail = async (req, res) => {
  try {
    const productDetail = await ProductDetail.findOne({ productId: req.params.productId })
      .populate('reviews.userId', 'name')
      .populate('questions.userId', 'name');
    
    if (!productDetail) {
      return res.status(404).json({ message: '상품 상세 정보를 찾을 수 없습니다.' });
    }
    
    res.json(productDetail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 상품 상세 정보 업데이트
exports.updateProductDetail = async (req, res) => {
  try {
    const productDetail = await ProductDetail.findOneAndUpdate(
      { productId: req.params.productId },
      req.body,
      { new: true }
    );
    
    if (!productDetail) {
      return res.status(404).json({ message: '상품 상세 정보를 찾을 수 없습니다.' });
    }
    
    res.json(productDetail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 리뷰 추가
exports.addReview = async (req, res) => {
  try {
    const productDetail = await ProductDetail.findOne({ productId: req.params.productId });
    
    if (!productDetail) {
      return res.status(404).json({ message: '상품 상세 정보를 찾을 수 없습니다.' });
    }
    
    productDetail.reviews.push(req.body);
    await productDetail.save();
    
    res.status(201).json(productDetail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 질문 추가
exports.addQuestion = async (req, res) => {
  try {
    const productDetail = await ProductDetail.findOne({ productId: req.params.productId });
    
    if (!productDetail) {
      return res.status(404).json({ message: '상품 상세 정보를 찾을 수 없습니다.' });
    }
    
    productDetail.questions.push(req.body);
    await productDetail.save();
    
    res.status(201).json(productDetail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 