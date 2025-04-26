const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const imageUrls = {
  trending: {
    'chatgpt5-preview.jpg': 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    'remote-work-2024.jpg': 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a'
  },
  lifestyle: {
    'morning-routine.jpg': 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853',
    'side-hustle.jpg': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85'
  },
  shopping: {
    'amazon-picks.jpg': 'https://images.unsplash.com/photo-1591085686350-798c0f9faa7f',
    'spring-fashion.jpg': 'https://images.unsplash.com/photo-1483985988355-763728e1935b'
  },
  food: {
    'quick-meal.jpg': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    'seoul-food.jpg': 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9'
  },
  hobby: {
    'camping-guide.jpg': 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4',
    'dog-training.jpg': 'https://images.unsplash.com/photo-1587300003388-59208cc962cb'
  },
  tech: {
    'vision-pro.jpg': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
    'laptop-guide.jpg': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853'
  },
  family: {
    'kids-coding.jpg': 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33',
    'senior-tech.jpg': 'https://images.unsplash.com/photo-1573497491765-dccce02b29df'
  }
};

const downloadImage = async (url, filepath) => {
  try {
    const response = await fetch(url);
    const buffer = await response.buffer();
    fs.writeFileSync(filepath, buffer);
    console.log(`Downloaded: ${filepath}`);
  } catch (error) {
    console.error(`Error downloading ${filepath}:`, error);
  }
};

const downloadAllImages = async () => {
  for (const [category, images] of Object.entries(imageUrls)) {
    const categoryPath = path.join(__dirname, '..', 'public', 'images', category);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(categoryPath)) {
      fs.mkdirSync(categoryPath, { recursive: true });
    }

    for (const [filename, url] of Object.entries(images)) {
      const filepath = path.join(categoryPath, filename);
      await downloadImage(url, filepath);
    }
  }
};

downloadAllImages().catch(console.error); 