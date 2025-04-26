const fs = require('fs');
const path = require('path');

// 이미지 파일 복사 함수
async function copyImages() {
  const sourceDir = path.join(__dirname, '../../../frontend/src/image');
  const targetDir = path.join(__dirname, '../../../frontend/public/images');

  // public/images 디렉토리가 없으면 생성
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const images = ['greenbacksin.jpg', 'green_1.jpg', 'green_2.jpg'];

  for (const image of images) {
    const sourcePath = path.join(sourceDir, image);
    const targetPath = path.join(targetDir, image);

    try {
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`${image} 복사 완료`);
      } else {
        console.log(`${image} 파일이 소스 디렉토리에 없습니다.`);
      }
    } catch (error) {
      console.error(`${image} 복사 중 오류 발생:`, error);
    }
  }
}

copyImages(); 