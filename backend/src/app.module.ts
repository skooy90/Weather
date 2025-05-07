import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ContentModule } from './content/content.module';
import { CategoryModule } from './category/category.module';
import { UploadModule } from './upload/upload.module';
import { SeedService } from './seed/seed.service';
import { User, UserSchema } from './schemas/user.schema';
import { Category, CategorySchema } from './schemas/category.schema';
import { Content, ContentSchema } from './schemas/content.schema';
import { Subcategory, SubcategorySchema } from './schemas/subcategory.schema';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { CommentModule } from './comment/comment.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { AuthGuard } from './middleware/auth.guard';
import { JwtService } from './utils/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb+srv://skooy:Nebuw399XaI8yamb@skyman.r0gqkcz.mongodb.net/weather?retryWrites=true&w=majority&appName=SkyMan', {
      retryAttempts: 5,
      retryDelay: 1000,
      autoIndex: true,
      autoCreate: true
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Content.name, schema: ContentSchema },
      { name: Subcategory.name, schema: SubcategorySchema },
      { name: Comment.name, schema: CommentSchema }
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    UserModule,
    ContentModule,
    CategoryModule,
    UploadModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SeedService,
    AuthGuard,
    {
      provide: JwtService,
      useClass: JwtService,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*');
  }
} 