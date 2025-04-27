import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ContentService } from './content.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('contents')
@Controller('contents')
export class ContentController {
  constructor(private contentService: ContentService) {}

  @Get()
  @ApiOperation({ summary: '모든 컨텐츠 조회' })
  @ApiResponse({ status: 200, description: '컨텐츠 조회 성공' })
  async findAll() {
    return this.contentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '컨텐츠 상세 조회' })
  @ApiResponse({ status: 200, description: '컨텐츠 상세 조회 성공' })
  async findById(@Param('id') id: string) {
    return this.contentService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: '컨텐츠 생성' })
  @ApiResponse({ status: 201, description: '컨텐츠 생성 성공' })
  async create(@Body() content: any) {
    return this.contentService.create(content);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: '컨텐츠 수정' })
  @ApiResponse({ status: 200, description: '컨텐츠 수정 성공' })
  async update(@Param('id') id: string, @Body() content: any) {
    return this.contentService.update(id, content);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: '컨텐츠 삭제' })
  @ApiResponse({ status: 200, description: '컨텐츠 삭제 성공' })
  async delete(@Param('id') id: string) {
    return this.contentService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/comments')
  @ApiOperation({ summary: '댓글 추가' })
  @ApiResponse({ status: 201, description: '댓글 추가 성공' })
  async addComment(@Param('id') id: string, @Body() comment: any) {
    return this.contentService.addComment(id, comment);
  }
} 