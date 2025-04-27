import { Controller, Post, Delete, Get, Param, UseInterceptors, UploadedFile, UseGuards, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UploadType } from './schemas/upload.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('uploads')
@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: '파일 업로드' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: '파일이 성공적으로 업로드됨' })
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
    return this.uploadService.saveFile(file, req.user.id);
  }

  @Post('profile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImage(@UploadedFile() file: Express.Multer.File, @Req() req) {
    return this.uploadService.saveFile(file, req.user.id, 'profile');
  }

  @Delete(':id')
  @ApiOperation({ summary: '파일 삭제' })
  @ApiResponse({ status: 200, description: '파일이 성공적으로 삭제됨' })
  async deleteFile(@Param('id') id: string) {
    await this.uploadService.deleteFile(id);
    return { message: 'File deleted successfully' };
  }

  @Get(':id')
  async getFile(@Param('id') id: string) {
    return this.uploadService.getFileById(id);
  }

  @Get('user/:userId')
  async getFilesByUser(@Param('userId') userId: string) {
    return this.uploadService.getFilesByUser(userId);
  }

  @Get('type/:type')
  async getFilesByType(@Param('type') type: UploadType) {
    return this.uploadService.getFilesByType(type);
  }
} 