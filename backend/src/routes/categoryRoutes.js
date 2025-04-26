const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
const auth = require('../middleware/auth');

// 모든 카테고리 조회
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find()
      .populate('subcategories')
      .sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 특정 카테고리 조회
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate('subcategories');
    if (!category) {
      return res.status(404).json({ message: '카테고리를 찾을 수 없습니다.' });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 카테고리 생성 (관리자만)
router.post('/', auth, async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
      description: req.body.description
    });

    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 카테고리 수정 (관리자만)
router.put('/:id', auth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: '카테고리를 찾을 수 없습니다.' });
    }

    if (req.body.name) category.name = req.body.name;
    if (req.body.description) category.description = req.body.description;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 카테고리 삭제 (관리자만)
router.delete('/:id', auth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: '카테고리를 찾을 수 없습니다.' });
    }

    // 관련 서브카테고리도 삭제
    await Subcategory.deleteMany({ category: category._id });
    await Category.deleteOne({ _id: category._id });
    
    res.json({ message: '카테고리가 삭제되었습니다.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 서브카테고리 생성 (관리자만)
router.post('/:categoryId/subcategories', auth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ message: '카테고리를 찾을 수 없습니다.' });
    }

    const subcategory = new Subcategory({
      name: req.body.name,
      description: req.body.description,
      category: category._id
    });

    const newSubcategory = await subcategory.save();
    category.subcategories.push(newSubcategory._id);
    await category.save();

    res.status(201).json(newSubcategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 