import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers['authorization'];
      console.log('[AuthMiddleware] Authorization Header:', authHeader);
      const token = authHeader?.split(' ')[1];

      if (!token) {
        console.log('[AuthMiddleware] No token found');
        req.user = null;
        return next();
      }

      try {
        const payload = await this.jwtService.verifyAsync(token);
        const user = await this.userService.findById(payload.sub);

        if (!user) {
          console.log('[AuthMiddleware] No user found for token payload:', payload);
          req.user = null;
          return next();
        }

        req.user = {
          userId: user.id,
          role: user.role,
        };
        console.log('[AuthMiddleware] Authenticated user:', req.user);
      } catch (jwtError) {
        console.log('[AuthMiddleware] JWT verification failed:', jwtError);
        req.user = null;
      }

      next();
    } catch (error) {
      console.log('[AuthMiddleware] Unexpected error:', error);
      req.user = null;
      next();
    }
  }
} 