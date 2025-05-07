import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document & {
  createdAt: Date;
};

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  birth: Date;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ default: 'active' })
  status: string;

  @Prop({ default: Date.now })
  joinDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
// 인덱스는 여기서만 선언
UserSchema.index({ userId: 1 }, { unique: true });
UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true }); 