import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content } from '../schemas/content.schema';

@Injectable()
export class ContentSeeder {
  constructor(
    @InjectModel(Content.name) private contentModel: Model<Content>,
  ) {}

  async seedContents() {
    const contents = [
      {
        title: '환영합니다',
        content: '첫 번째 게시글입니다.',
        category: '일반',
      },
    ];

    for (const content of contents) {
      const exists = await this.contentModel.findOne({ title: content.title });
      if (!exists) {
        await this.contentModel.create(content);
      }
    }
  }
}

export const seedContents = async () => {
  const seeder = new ContentSeeder(null);
  await seeder.seedContents();
}; 