import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  generateToken(userId: string): string {
    return jwt.sign(
      { userId },
      this.configService.get<string>('JWT_SECRET'),
      { expiresIn: '24h' }
    );
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.configService.get<string>('JWT_SECRET'));
    } catch (error) {
      return null;
    }
  }

  getUserIdFromToken(token: string): string | null {
    const decoded = this.verifyToken(token);
    return decoded ? decoded.userId : null;
  }
} 