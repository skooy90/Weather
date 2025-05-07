import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { ContentService } from './content.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Content } from '../schemas/content.schema';
import { FrontendContent } from './content.service';

@ApiTags('contents')
@Controller('contents')
export class ContentController {
  constructor(private contentService: ContentService) {}

  @Get()
  @ApiOperation({ summary: '모든 컨텐츠 조회' })
  @ApiResponse({ status: 200, description: '컨텐츠 조회 성공' })
  async findAll(): Promise<FrontendContent[]> {
    return this.contentService.findAll();
  }

  @Get('category/:category')
  @ApiOperation({ summary: '카테고리별 컨텐츠 조회' })
  @ApiResponse({ status: 200, description: '카테고리별 컨텐츠 조회 성공' })
  async findByCategory(@Param('category') category: string): Promise<FrontendContent[]> {
    return this.contentService.findByCategory(category);
  }

  @Get('category/:category/subcategory/:subcategory')
  @ApiOperation({ summary: '서브카테고리별 컨텐츠 조회' })
  @ApiResponse({ status: 200, description: '서브카테고리별 컨텐츠 조회 성공' })
  async findBySubcategory(
    @Param('category') category: string,
    @Param('subcategory') subcategory: string
  ): Promise<FrontendContent[]> {
    return this.contentService.findBySubcategory(category, subcategory);
  }

  @Get(':id')
  @ApiOperation({ summary: '컨텐츠 상세 조회' })
  @ApiResponse({ status: 200, description: '컨텐츠 상세 조회 성공' })
  async findById(@Param('id') id: string): Promise<FrontendContent> {
    return this.contentService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: '컨텐츠 생성' })
  @ApiResponse({ status: 201, description: '컨텐츠 생성 성공' })
  async create(@Body() content: Partial<Content>, @Req() req): Promise<FrontendContent> {
    return this.contentService.create({
      ...content,
      author: req.user.id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: '컨텐츠 수정' })
  @ApiResponse({ status: 200, description: '컨텐츠 수정 성공' })
  async update(@Param('id') id: string, @Body() content: Partial<Content>, @Req() req): Promise<FrontendContent> {
    const existingContent = await this.contentService.findById(id);
    if (existingContent.author !== req.user.id) {
      throw new Error('권한이 없습니다.');
    }
    return this.contentService.update(id, content);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: '컨텐츠 삭제' })
  @ApiResponse({ status: 200, description: '컨텐츠 삭제 성공' })
  async delete(@Param('id') id: string, @Req() req): Promise<void> {
    const existingContent = await this.contentService.findById(id);
    if (existingContent.author !== req.user.id) {
      throw new Error('권한이 없습니다.');
    }
    return this.contentService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/comments')
  @ApiOperation({ summary: '댓글 추가' })
  @ApiResponse({ status: 201, description: '댓글 추가 성공' })
  async addComment(@Param('id') id: string, @Body() comment: any, @Req() req): Promise<FrontendContent> {
    return this.contentService.addComment(id, {
      ...comment,
      author: req.user.id,
    });
  }
} 