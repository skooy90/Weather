import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    cors: {
      origin: ['https://weather-of7u.onrender.com'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    }
  });
  
  const configService = app.get(ConfigService);

  // 정적 파일 서빙 설정
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/images/',
  });

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('Weather API')
    .setDescription('Weather API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // 전역 접두사 설정
  app.setGlobalPrefix('api');

  // CSP 헤더 설정
  app.use((req, res, next) => {
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://weather-backend-knii.onrender.com; " +
      "style-src 'self' 'unsafe-inline' https://unpkg.com https://weather-backend-knii.onrender.com; " +
      "connect-src 'self' https://weather-backend-knii.onrender.com; " +
      "img-src 'self' https://weather-of7u.onrender.com https://weather-backend-knii.onrender.com data: https:; " +
      "font-src 'self' data: https: https://weather-backend-knii.onrender.com;"
    );
    next();
  });

  // 전역 파이프 설정
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  try {
    const port = process.env.PORT || 10000;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
  } catch (error) {
    console.error('Failed to start the application:', error);
    process.exit(1);
  }
}

bootstrap(); 