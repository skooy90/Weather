import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { Category } from '../schemas/category.schema';
import { Content } from '../schemas/content.schema';
import { Subcategory } from '../schemas/subcategory.schema';
import { seedUsers } from './users';
import { seedCategories } from './categories';
import { seedContents } from './contents';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(Content.name) private readonly contentModel: Model<Content>,
    @InjectModel(Subcategory.name) private readonly subcategoryModel: Model<Subcategory>,
    private readonly configService: ConfigService,
  ) {}

  async seed() {
    try {
      console.log('시드 데이터 생성 시작...');
      
      await seedUsers(this.userModel);
      console.log('사용자 시딩 완료');

      await seedCategories(this.categoryModel, this.subcategoryModel, this.configService);
      console.log('카테고리 시딩 완료');

      await seedContents(this.contentModel);
      console.log('컨텐츠 시딩 완료');

      console.log('모든 시드 데이터 생성 완료');
    } catch (error) {
      console.error('시드 데이터 생성 실패:', error);
      throw error;
    }
  }
} 