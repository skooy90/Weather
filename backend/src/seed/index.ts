import { seedCategories } from './categories';
import { seedContents } from './contents';
import { Model } from 'mongoose';
import { Category } from '../schemas/category.schema';

export const seedDatabase = async (categoryModel: Model<Category>) => {
  try {
    console.log('시드 데이터 생성 시작...');
    
    if (!categoryModel) {
      throw new Error('Category model is required for seeding');
    }

    await seedCategories(categoryModel);
    console.log('카테고리 시딩 완료');

    await seedContents();
    console.log('콘텐츠 시딩 완료');

    console.log('모든 시드 데이터 생성 완료');
  } catch (error) {
    console.error('시드 데이터 생성 실패:', error);
    throw error;
  }
}; 