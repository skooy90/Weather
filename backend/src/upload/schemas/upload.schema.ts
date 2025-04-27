import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UploadDocument = Upload & Document;

export enum UploadType {
  IMAGE = 'image',
  DOCUMENT = 'document',
  MEDIA = 'media',
}

export enum ImageSubType {
  PROFILE = 'profile',
  POST = 'post',
  BANNER = 'banner',
}

export enum DocumentSubType {
  PDF = 'pdf',
  DOC = 'doc',
  XLS = 'xls',
}

export enum MediaSubType {
  VIDEO = 'video',
  AUDIO = 'audio',
}

@Schema({ timestamps: true })
export class Upload {
  @Prop({ required: true })
  originalName: string;

  @Prop({ required: true })
  path: string;

  @Prop({ required: true, enum: UploadType })
  type: UploadType;

  @Prop({ required: true })
  subType: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  uploadedBy: string;

  @Prop()
  mimeType: string;

  @Prop()
  width?: number;

  @Prop()
  height?: number;

  @Prop()
  duration?: number;
}

export const UploadSchema = SchemaFactory.createForClass(Upload); 