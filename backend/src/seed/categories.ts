import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../schemas/category.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CategorySeeder implements OnModuleInit {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    if (this.configService.get('ENABLE_SEEDING') === 'true') {
      await this.seedCategories();
    }
  }

  private async seedCategories() {
    const categories = this.configService.get('DEFAULT_CATEGORIES') || [
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

export const seedCategories = async (categoryModel: Model<Category>) => {
  if (!categoryModel) {
    throw new Error('Category model is required for seeding');
  }
  const seeder = new CategorySeeder(categoryModel);
  await seeder.seedCategories();
}; 