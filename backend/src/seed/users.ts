import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { hash } from 'bcrypt';

@Injectable()
export class UserSeeder {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  public async seedUsers() {
    const existingAdmin = await this.userModel.findOne({ userId: 'admin' });
    
    if (!existingAdmin) {
      const hashedPassword = await hash('qwe@123', 10);
      await this.userModel.create({
        userId: 'admin',
        password: hashedPassword,
        name: '관리자',
        role: 'admin'
      });
      console.log('Admin 계정이 생성되었습니다.');
    } else {
      console.log('Admin 계정이 이미 존재합니다.');
    }
  }
}

export const seedUsers = async (userModel: Model<User>) => {
  const seeder = new UserSeeder(userModel);
  await seeder.seedUsers();
}; 