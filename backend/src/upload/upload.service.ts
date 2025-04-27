import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Upload, UploadDocument, UploadType, ImageSubType, DocumentSubType, MediaSubType } from './schemas/upload.schema';

@Injectable()
export class UploadService {
  constructor(
    private configService: ConfigService,
    @InjectModel(Upload.name) private uploadModel: Model<UploadDocument>,
  ) {}

  private getUploadPath(type: UploadType, subType: string): string {
    return path.join(process.cwd(), 'uploads', type, subType);
  }

  private async ensureDirectoryExists(dirPath: string): Promise<void> {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  private getFileType(mimeType: string): { type: UploadType; subType: string } {
    if (mimeType.startsWith('image/')) {
      return { type: UploadType.IMAGE, subType: ImageSubType.POST };
    } else if (mimeType.startsWith('application/pdf')) {
      return { type: UploadType.DOCUMENT, subType: DocumentSubType.PDF };
    } else if (mimeType.startsWith('video/')) {
      return { type: UploadType.MEDIA, subType: MediaSubType.VIDEO };
    } else if (mimeType.startsWith('audio/')) {
      return { type: UploadType.MEDIA, subType: MediaSubType.AUDIO };
    }
    throw new Error('Unsupported file type');
  }

  async saveFile(file: Express.Multer.File, userId: string, subType?: string): Promise<UploadDocument> {
    const { type, subType: detectedSubType } = this.getFileType(file.mimetype);
    const finalSubType = subType || detectedSubType;
    
    const uploadDir = this.getUploadPath(type, finalSubType);
    await this.ensureDirectoryExists(uploadDir);

    const timestamp = Date.now();
    const filename = `${timestamp}-${file.originalname}`;
    const filepath = path.join(uploadDir, filename);

    fs.writeFileSync(filepath, file.buffer);

    const upload = new this.uploadModel({
      originalName: file.originalname,
      path: `/uploads/${type}/${finalSubType}/${filename}`,
      type,
      subType: finalSubType,
      size: file.size,
      uploadedBy: userId,
      mimeType: file.mimetype,
    });

    return upload.save();
  }

  async deleteFile(id: string): Promise<void> {
    const upload = await this.uploadModel.findById(id);
    if (!upload) {
      throw new Error('File not found');
    }

    const filepath = path.join(process.cwd(), upload.path);
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    await this.uploadModel.findByIdAndDelete(id);
  }

  async getFileById(id: string): Promise<UploadDocument> {
    return this.uploadModel.findById(id);
  }

  async getFilesByUser(userId: string): Promise<UploadDocument[]> {
    return this.uploadModel.find({ uploadedBy: userId });
  }

  async getFilesByType(type: UploadType, subType?: string): Promise<UploadDocument[]> {
    const query: any = { type };
    if (subType) {
      query.subType = subType;
    }
    return this.uploadModel.find(query);
  }
} 