const seedCategories = require('./categories');
const seedContents = require('./contents');

const seedAll = async () => {
  try {
    await seedCategories();
    await seedContents();
    console.log('모든 시드 데이터 생성 완료');
    process.exit(0);
  } catch (error) {
    console.error('시드 데이터 생성 실패:', error);
    process.exit(1);
  }
};

seedAll(); 