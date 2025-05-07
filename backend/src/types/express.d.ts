import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: 'user' | 'admin';
      };
    }
  }
}

export { Request, Response, NextFunction }; 