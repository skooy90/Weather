import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UploadType } from './schemas/upload.schema';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
    return this.uploadService.saveFile(file, req.user.id, UploadType.CONTENT);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImage(@UploadedFile() file: Express.Multer.File, @Req() req) {
    return this.uploadService.saveFile(file, req.user.id, UploadType.PROFILE);
  }
} 