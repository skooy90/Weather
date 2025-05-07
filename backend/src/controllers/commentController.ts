import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { CommentService } from '../comment/comment.service';
import { Comment } from '../schemas/comment.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../middleware/roles.decorator';
import { AuthGuard } from '../middleware/auth.guard';

@Controller('comments')
@UseGuards(JwtAuthGuard, AuthGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() comment: Partial<Comment>, @Req() req) {
    return this.commentService.create({
      ...comment,
      author: req.user.userId,
    });
  }

  @Get(':contentId')
  async findAll(@Param('contentId') contentId: string) {
    return this.commentService.findAll(contentId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() comment: Partial<Comment>, @Req() req) {
    const existingComment = await this.commentService.findOne(id);
    if (existingComment.author.toString() !== req.user.userId) {
      throw new Error('권한이 없습니다.');
    }
    return this.commentService.update(id, comment);
  }

  @Delete(':id')
  @Roles('admin')
  async delete(@Param('id') id: string) {
    return this.commentService.delete(id);
  }

  @Post(':id/like')
  async like(@Param('id') id: string, @Req() req) {
    return this.commentService.like(id, req.user.userId);
  }
} 