import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as seedData from './scripts/seedData';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
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
  app.enableCors();

  // 데이터베이스 시딩
  try {
    await seedData.seedDatabase();
    console.log('데이터베이스 시딩이 완료되었습니다.');
  } catch (error) {
    console.error('데이터베이스 시딩 중 오류가 발생했습니다:', error);
  }

  const port = process.env.PORT || 10000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap(); 