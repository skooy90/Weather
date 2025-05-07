import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category } from '../schemas/category.schema';
import { Subcategory } from '../schemas/subcategory.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CategorySeeder {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(Subcategory.name) private readonly subcategoryModel: Model<Subcategory>,
    private readonly configService: ConfigService
  ) {}

  public async seedCategories() {
    const categories = [
      {
        name: 'trending',
        description: '현재 인기 있는 콘텐츠',
        subcategories: [
          { name: 'ai-tech', description: 'AI 및 기술 관련 트렌드' },
          { name: 'digital-nomad', description: '디지털 노마드 관련 트렌드' }
        ]
      },
      {
        name: 'lifestyle',
        description: '라이프스타일 관련 콘텐츠',
        subcategories: [
          { name: 'self-improvement', description: '자기계발 관련 콘텐츠' },
          { name: 'side-hustle', description: '부업 관련 콘텐츠' }
        ]
      },
      {
        name: 'shopping',
        description: '쇼핑 관련 콘텐츠',
        subcategories: [
          { name: 'shopping', description: '쇼핑 관련 정보' },
          { name: 'fashion', description: '패션 관련 정보' }
        ]
      },
      {
        name: 'food',
        description: '음식 관련 콘텐츠',
        subcategories: [
          { name: 'recipe', description: '레시피 관련 정보' },
          { name: 'restaurant', description: '맛집 관련 정보' }
        ]
      },
      {
        name: 'hobby',
        description: '취미 관련 콘텐츠',
        subcategories: [
          { name: 'outdoor', description: '아웃도어 관련 정보' },
          { name: 'pets', description: '반려동물 관련 정보' }
        ]
      },
      {
        name: 'tech',
        description: '기술 관련 콘텐츠',
        subcategories: [
          { name: 'gadgets', description: '가제트 관련 정보' },
          { name: 'review', description: '기기 리뷰 관련 정보' }
        ]
      },
      {
        name: 'family',
        description: '가족 관련 콘텐츠',
        subcategories: [
          { name: 'education', description: '교육 관련 정보' },
          { name: 'senior', description: '시니어 관련 정보' }
        ]
      }
    ];

    try {
      // 기존 데이터 삭제
      await this.subcategoryModel.deleteMany({});
      await this.categoryModel.deleteMany({});
      
      // 카테고리 및 서브카테고리 생성
      for (const categoryData of categories) {
        const category = await this.categoryModel.create({
          name: categoryData.name,
          description: categoryData.description,
          subcategories: []
        });
        
        // 서브카테고리 생성
        for (const subcategoryData of categoryData.subcategories) {
          const subcategory = await this.subcategoryModel.create({
            name: subcategoryData.name,
            description: subcategoryData.description,
            category: category._id
          });
          
          await this.categoryModel.findByIdAndUpdate(
            category._id,
            { $push: { subcategories: subcategory._id } }
          );
        }
      }
      
      console.log('카테고리 시드 데이터 생성 완료');
    } catch (error) {
      console.error('카테고리 시드 데이터 생성 실패:', error);
      throw error;
    }
  }
}

export const seedCategories = async (categoryModel: Model<Category>, subcategoryModel: Model<Subcategory>, configService: ConfigService) => {
  const seeder = new CategorySeeder(categoryModel, subcategoryModel, configService);
  await seeder.seedCategories();
}; 