import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { compare, hash } from 'bcrypt';
// import { RedisService } from '@nestjs-modules/ioredis'; // 삭제 또는 주석 처리

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    // private redisService: RedisService, // 삭제 또는 주석 처리
  ) {}

  async checkUserIdExists(userId: string): Promise<boolean> {
    try {
      const user = await this.userService.findByUserId(userId);
      return !!user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        error.message || '아이디 중복 확인 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async validateUser(userId: string, password: string): Promise<any> {
    const userDocument = await this.userService.findUserDocumentByUserId(userId);
    if (userDocument && await compare(password, userDocument.password)) {
      return {
        id: userDocument._id.toString(),
        userId: userDocument.userId,
        username: userDocument.username,
        email: userDocument.email,
        role: userDocument.role,
        joinDate: userDocument.createdAt ? userDocument.createdAt.toISOString() : ''
      };
    }
    return null;
  }

  async createUser(userData: any) {
    try {
      const { userId, username, email, password, birth } = userData;

      // 중복 확인
      const existingUserId = await this.userService.findByUserId(userId);
      if (existingUserId) {
        throw new HttpException('이미 사용 중인 아이디입니다.', HttpStatus.BAD_REQUEST);
      }

      const existingUsername = await this.userService.findByUsername(username);
      if (existingUsername) {
        throw new HttpException('이미 사용 중인 사용자 이름입니다.', HttpStatus.BAD_REQUEST);
      }

      const existingEmail = await this.userService.findByEmail(email);
      if (existingEmail) {
        throw new HttpException('이미 사용 중인 이메일입니다.', HttpStatus.BAD_REQUEST);
      }

      // 새 사용자 생성
      return this.userService.create({
        userId,
        username,
        email,
        password,
        birth,
        role: 'user'
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        error.message || '사용자 생성 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    // Refresh Token을 Redis에 저장 (임시로 주석 처리)
    // await this.redisService.set(
    //   `refresh_token:${user.id}`,
    //   refreshToken,
    //   'EX',
    //   7 * 24 * 60 * 60 // 7일
    // );
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken);
      // const storedRefreshToken = await this.redisService.get(`refresh_token:${decoded.sub}`); // 주석 처리
      // if (!storedRefreshToken || storedRefreshToken !== refreshToken) {
      //   throw new UnauthorizedException('Invalid refresh token');
      // }
      const payload = { username: decoded.username, sub: decoded.sub };
      const newAccessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
      const newRefreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
      // await this.redisService.set(
      //   `refresh_token:${decoded.sub}`,
      //   newRefreshToken,
      //   'EX',
      //   7 * 24 * 60 * 60
      // );
      return {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string) {
    // await this.redisService.del(`refresh_token:${userId}`); // 주석 처리
  }

  async verifyToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      return { valid: true, user: decoded };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
} 