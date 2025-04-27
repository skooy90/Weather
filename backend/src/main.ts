import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user/user.service';
import { ContentService } from './content/content.service';
import { NestExpressApplication } from '@nestjs/platform-express';

async function seedDatabase(userService: UserService, contentService: ContentService) {
  try {
    // 관리자 계정 생성
    const adminUser = await userService.findByUsername('admin');
    if (!adminUser) {
      await userService.create({
        username: 'admin',
        password: 'admin123',
        email: 'admin@example.com',
        role: 'admin'
      });
      console.log('관리자 계정이 생성되었습니다.');
    }

    // 테스트 콘텐츠 생성
    const contents = await contentService.findAll();
    if (contents.length === 0) {
      await contentService.create({
        title: '환영합니다',
        content: '첫 번째 게시글입니다.',
        author: 'admin'
      });
      console.log('테스트 콘텐츠가 생성되었습니다.');
    }
  } catch (error) {
    console.error('시드 데이터 생성 중 오류가 발생했습니다:', error);
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
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

  // 서비스 인스턴스 가져오기
  const userService = app.get(UserService);
  const contentService = app.get(ContentService);

  // 데이터베이스 시딩
  await seedDatabase(userService, contentService);

  const port = process.env.PORT || 10000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap(); 