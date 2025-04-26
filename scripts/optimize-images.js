const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const categories = [
  'trending',
  'lifestyle',
  'shopping',
  'food',
  'hobby',
  'tech',
  'family'
];

const optimizeImage = async (inputPath) => {
  try {
    const dir = path.dirname(inputPath);
    const ext = path.extname(inputPath);
    const name = path.basename(inputPath, ext);
    
    // JPEG 최적화
    const optimizedPath = path.join(dir, `${name}-optimized${ext}`);
    await sharp(inputPath)
      .resize(1200, 800, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({
        quality: 85,
        chromaSubsampling: '4:4:4'
      })
      .toFile(optimizedPath);

    // WebP 버전 생성
    const webpPath = path.join(dir, `${name}.webp`);
    await sharp(inputPath)
      .resize(1200, 800, {
        fit: 'cover',
        position: 'center'
      })
      .webp({
        quality: 85
      })
      .toFile(webpPath);

    // 썸네일 버전 생성
    const thumbPath = path.join(dir, `${name}-thumb${ext}`);
    await sharp(inputPath)
      .resize(400, 267, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({
        quality: 60
      })
      .toFile(thumbPath);

    // 원본 파일을 최적화된 버전으로 교체
    fs.unlinkSync(inputPath);
    fs.renameSync(optimizedPath, inputPath);

    console.log(`Optimized: ${inputPath}`);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error);
  }
};

const processImages = async () => {
  for (const category of categories) {
    const categoryPath = path.join(__dirname, '..', 'public', 'images', category);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(categoryPath)) {
      fs.mkdirSync(categoryPath, { recursive: true });
    }

    const files = fs.readdirSync(categoryPath);
    for (const file of files) {
      if (file.endsWith('.jpg') && !file.includes('-thumb') && !file.includes('-optimized')) {
        const inputPath = path.join(categoryPath, file);
        await optimizeImage(inputPath);
      }
    }
  }
};

processImages().catch(console.error); 