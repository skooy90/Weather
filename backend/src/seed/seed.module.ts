import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { User, UserSchema } from '../schemas/user.schema';
import { Category, CategorySchema } from '../schemas/category.schema';
import { Subcategory, SubcategorySchema } from '../schemas/subcategory.schema';
import { Content, ContentSchema } from '../schemas/content.schema';
import { SeedService } from './seed.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb+srv://skooy:Nebuw399XaI8yamb@skyman.r0gqkcz.mongodb.net/weather?retryWrites=true&w=majority&appName=SkyMan'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Subcategory.name, schema: SubcategorySchema },
      { name: Content.name, schema: ContentSchema },
    ]),
  ],
  providers: [SeedService],
})
export class SeedModule {} 