import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CommentService } from '../../comment/comment.service';
import { CommentController } from '../../comment/comment.controller';
// ... 기타 import

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    // ... 기타 모듈
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {} 