import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { NestApplication } from '@nestjs/core';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule, {
    logger: ['error', 'warn'],
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      credentials: true,
    }
  });
  
  const configService = app.get(ConfigService);

  // CSP 헤더 설정
  app.use((req: Request, res: Response, next) => {
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com; " +
      "style-src 'self' 'unsafe-inline' https://unpkg.com; " +
      "connect-src 'self' https://weather-backend-knii.onrender.com; " +
      "img-src 'self' data: https:; " +
      "font-src 'self' data: https:;"
    );
    next();
  });

  // 루트 경로 핸들러 추가
  app.getHttpAdapter().get('/', (req: Request, res: Response) => {
    res.redirect('/api');
  });

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

  const port = configService.get('PORT') || 10000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap(); 