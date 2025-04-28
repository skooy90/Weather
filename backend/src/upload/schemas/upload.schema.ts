import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UploadDocument = Upload & Document;

export enum UploadType {
  PROFILE = 'profile',
  CONTENT = 'content',
  THUMBNAIL = 'thumbnail'
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