import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import { Upload } from './schemas/upload.schema';
import { UploadType, UploadSubType } from './schemas/upload.schema';

@Injectable()
export class UploadService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(Upload.name) private readonly uploadModel: Model<Upload>,
  ) {
    this.ensureUploadDirectories();
  }

  private ensureUploadDirectories() {
    const baseDir = process.env.UPLOAD_DIR || '/tmp/uploads';
    const dirs = [
      path.join(baseDir, 'images/profile'),
      path.join(baseDir, 'images/post'),
      path.join(baseDir, 'images/banner'),
      path.join(baseDir, 'documents'),
      path.join(baseDir, 'media'),
    ];

    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  private getUploadPath(type: UploadType, subType?: UploadSubType): string {
    const baseDir = process.env.UPLOAD_DIR || '/tmp/uploads';
    switch (type) {
      case UploadType.IMAGE:
        return path.join(baseDir, 'images', subType || 'post');
      case UploadType.DOCUMENT:
        return path.join(baseDir, 'documents');
      case UploadType.MEDIA:
        return path.join(baseDir, 'media');
      default:
        return path.join(baseDir, 'others');
    }
  }

  async saveFile(
    file: Express.Multer.File,
    userId: string,
    type: UploadType,
    subType?: UploadSubType,
  ): Promise<Upload> {
    try {
      const uploadDir = this.getUploadPath(type, subType);
      const filename = `${Date.now()}-${file.originalname}`;
      const filepath = path.join(uploadDir, filename);

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      fs.writeFileSync(filepath, file.buffer);

      const upload = new this.uploadModel({
        originalName: file.originalname,
        path: filepath,
        type,
        subType,
        size: file.size,
        uploadedBy: userId,
        mimeType: file.mimetype,
      });

      return await upload.save();
    } catch (error) {
      console.error('파일 저장 실패:', error);
      throw error;
    }
  }

  async deleteFile(id: string): Promise<void> {
    try {
      const upload = await this.uploadModel.findById(id);
      if (upload) {
        if (fs.existsSync(upload.path)) {
          fs.unlinkSync(upload.path);
        }
        await this.uploadModel.findByIdAndDelete(id);
      }
    } catch (error) {
      console.error('파일 삭제 실패:', error);
      throw error;
    }
  }

  async getFileById(id: string): Promise<Upload> {
    return this.uploadModel.findById(id);
  }

  async getFilesByUser(userId: string): Promise<Upload[]> {
    return this.uploadModel.find({ uploadedBy: userId });
  }

  async getFilesByType(type: UploadType): Promise<Upload[]> {
    return this.uploadModel.find({ type });
  }
} 