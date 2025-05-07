import { Model } from 'mongoose';
import { Category } from '../schemas/category.schema';
import { User } from '../schemas/user.schema';
import { Subcategory } from '../schemas/subcategory.schema';
import { Content } from '../schemas/content.schema';
import { seedCategories } from './categories';
import { seedUsers } from './users';
import { seedContents } from './contents';
import { ConfigService } from '@nestjs/config';

export const seedDatabase = async (
  categoryModel: Model<Category>,
  userModel: Model<User>,
  subcategoryModel: Model<Subcategory>,
  contentModel: Model<Content>,
  configService: ConfigService
) => {
  try {
    console.log('시드 데이터 생성 시작...');
    
    if (!categoryModel || !userModel || !subcategoryModel || !contentModel) {
      throw new Error('Required models are missing for seeding');
    }

    if (configService.get('ENABLE_SEEDING') !== 'true') {
      console.log('시드 실행이 비활성화되어 있습니다.');
      return;
    }

    await seedUsers(userModel);
    console.log('사용자 시딩 완료');

    await seedCategories(categoryModel, subcategoryModel, configService);
    console.log('카테고리 시딩 완료');

    await seedContents(contentModel);
    console.log('컨텐츠 시딩 완료');

    console.log('모든 시드 데이터 생성 완료');
  } catch (error) {
    console.error('시드 데이터 생성 실패:', error);
    throw error;
  }
}; 