import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from '../schemas/comment.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../middleware/roles.decorator';
import { AuthGuard } from '../middleware/auth.guard';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard, AuthGuard)
  @Post()
  async create(@Body() comment: Partial<Comment>, @Req() req) {
    return this.commentService.create({
      ...comment,
      author: req.user.id,
    });
  }

  @Get('content/:contentId')
  async findAll(@Param('contentId') contentId: string) {
    return this.commentService.findAll(contentId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() comment: Partial<Comment>, @Req() req) {
    const existingComment = await this.commentService.findOne(id);
    if (existingComment.author.toString() !== req.user.id) {
      throw new Error('권한이 없습니다.');
    }
    return this.commentService.update(id, comment);
  }

  @UseGuards(JwtAuthGuard, AuthGuard)
  @Delete(':id')
  @Roles('admin')
  async delete(@Param('id') id: string) {
    return this.commentService.delete(id);
  }

  @UseGuards(JwtAuthGuard, AuthGuard)
  @Post(':id/like')
  async like(@Param('id') id: string, @Req() req) {
    return this.commentService.like(id, req.user.id);
  }
} 