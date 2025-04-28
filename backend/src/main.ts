import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { seedDatabase } from './seed';
import { getModelToken } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { NestApplication } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  const configService = app.get(ConfigService);

  // 전역 파이프 설정
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('Weather API')
    .setDescription('Weather API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // CORS 설정
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  });

  const port = configService.get('PORT') || 10000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);

  // 데이터베이스 시딩
  const categoryModel = app.get(getModelToken(Category.name));
  await seedDatabase(categoryModel, configService);
}
bootstrap(); 