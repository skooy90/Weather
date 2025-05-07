import { Controller, Post, Body, Get, UseGuards, Request, Param, HttpException, HttpStatus, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  async login(@Request() req) {
    const result = await this.authService.login(req.user);
    return {
      success: true,
      data: {
        token: result.access_token,
        user: {
          id: req.user.id,
          username: req.user.username,
          email: req.user.email,
          role: req.user.role,
          joinDate: req.user.joinDate
        }
      },
      message: '로그인에 성공했습니다.'
    };
  }

  @Post('signup')
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 201, description: '회원가입 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async signup(@Body() userData: any) {
    try {
      const { userId, username, email, password, birth } = userData;
      
      if (!userId || !username || !email || !password || !birth) {
        throw new HttpException({
          success: false,
          message: '모든 필수 필드를 입력해주세요.',
          error: 'ValidationError'
        }, HttpStatus.BAD_REQUEST);
      }

      const user = await this.authService.createUser({
        userId,
        username,
        email,
        password,
        birth
      });

      const token = await this.authService.login(user);

      return {
        success: true,
        data: {
          token: token.access_token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            joinDate: user.joinDate
          }
        },
        message: '회원가입이 완료되었습니다.'
      };
    } catch (error) {
      throw new HttpException({
        success: false,
        message: error.message || '회원가입 중 오류가 발생했습니다.',
        error: error.name
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('refresh')
  async refreshToken(@Body('refresh_token') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '로그아웃' })
  @ApiResponse({ status: 200, description: '로그아웃 성공' })
  async logout(@Req() req) {
    await this.authService.logout(req.user.sub);
    return { message: 'Logged out successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify')
  @ApiOperation({ summary: '토큰 검증' })
  @ApiResponse({ status: 200, description: '토큰 검증 성공' })
  @ApiResponse({ status: 401, description: '토큰 검증 실패' })
  async verifyToken(@Request() req) {
    return { valid: true, user: req.user };
  }

  @Get('check-userid/:userId')
  @ApiOperation({ summary: '사용자 ID 중복 체크' })
  @ApiResponse({ status: 200, description: '사용 가능한 ID' })
  @ApiResponse({ status: 400, description: '이미 사용 중인 ID' })
  async checkUserId(@Param('userId') userId: string) {
    try {
      const exists = await this.authService.checkUserIdExists(userId);
      return {
        success: true,
        data: { available: !exists },
        message: exists ? '이미 사용 중인 아이디입니다.' : '사용 가능한 아이디입니다.'
      };
    } catch (error) {
      throw new HttpException({
        success: false,
        message: error.message || '아이디 중복 확인 중 오류가 발생했습니다.',
        error: error.name
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
} 