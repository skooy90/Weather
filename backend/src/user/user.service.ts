import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { hash } from 'bcrypt';

export interface FrontendUser {
  id: string;
  username: string;
  email: string;
  role: string;
  joinDate: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  private toFrontendUser(user: UserDocument): FrontendUser {
    return {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
      joinDate: user.createdAt ? user.createdAt.toISOString() : '',
    };
  }

  async findByUsername(username: string): Promise<FrontendUser | null> {
    const user = await this.userModel.findOne({ username }).exec();
    return user ? this.toFrontendUser(user) : null;
  }

  async findByEmail(email: string): Promise<FrontendUser | null> {
    const user = await this.userModel.findOne({ email }).exec();
    return user ? this.toFrontendUser(user) : null;
  }

  async findById(id: string): Promise<FrontendUser | null> {
    const user = await this.userModel.findById(id).exec();
    return user ? this.toFrontendUser(user) : null;
  }

  async findByUserId(userId: string): Promise<UserDocument | null> {
    try {
      return await this.userModel.findOne({ userId }).lean().exec();
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException('이미 사용 중인 아이디입니다.', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        error.message || '사용자 조회 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findUserDocumentByUserId(userId: string): Promise<UserDocument | null> {
    return this.findByUserId(userId);
  }

  async create(user: Partial<User>): Promise<FrontendUser> {
    const hashedPassword = await hash(user.password, 10);
    const createdUser = new this.userModel({
      ...user,
      password: hashedPassword,
    });
    const savedUser = await createdUser.save();
    return this.toFrontendUser(savedUser);
  }
} 