import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../schemas/category.schema';

@Injectable()
export class CategorySeeder {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async seedCategories() {
    const categories = [
      { name: '일반', description: '일반 게시글' },
      { name: '공지사항', description: '공지사항' },
      { name: '질문', description: '질문 게시글' },
    ];

    for (const category of categories) {
      const exists = await this.categoryModel.findOne({ name: category.name });
      if (!exists) {
        await this.categoryModel.create(category);
      }
    }
  }
}

export const seedCategories = async () => {
  const seeder = new CategorySeeder(null);
  await seeder.seedCategories();
}; 