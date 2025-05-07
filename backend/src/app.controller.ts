import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { AppService } from './app.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectConnection() private readonly connection: Connection
  ) {}

  @Get()
  getRoot(@Res() res: Response) {
    res.sendFile(join(__dirname, '..', 'public', 'index.html'));
  }

  @Get('health')
  async getHealth() {
    try {
      const mongoStatus = this.connection.readyState === 1 ? 'connected' : 'disconnected';
      return {
        status: 'ok',
        mongo: mongoStatus,
        timestamp: new Date().toISOString()
      };
    } catch (e) {
      return { status: 'fail', error: e.message };
    }
  }
} 