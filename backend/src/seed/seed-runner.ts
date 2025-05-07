import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { SeedService } from './seed.service';

async function bootstrap() {
  try {
    const app = await NestFactory.createApplicationContext(SeedModule);
    const seedService = app.get(SeedService);

    console.log('시드 데이터 생성 시작...');
    await seedService.seed();
    console.log('모든 시드 데이터 생성 완료');
    
    await app.close();
  } catch (error) {
    console.error('시드 데이터 생성 실패:', error);
    process.exit(1);
  }
}

bootstrap(); 