import { seedCategories } from './categories';
import { seedContents } from './contents';

export const seedDatabase = async () => {
  try {
    await seedCategories();
    await seedContents();
    console.log('모든 시드 데이터 생성 완료');
  } catch (error) {
    console.error('시드 데이터 생성 실패:', error);
    throw error;
  }
}; 