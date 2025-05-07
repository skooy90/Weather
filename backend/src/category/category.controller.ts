import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../middleware/roles.decorator';
import { AuthGuard } from '../middleware/auth.guard';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: '모든 카테고리 조회' })
  @ApiResponse({ status: 200, description: '카테고리 목록 반환' })
  async findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 카테고리 조회' })
  @ApiResponse({ status: 200, description: '카테고리 정보 반환' })
  async findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Get(':id/subcategories')
  @ApiOperation({ summary: '카테고리의 서브카테고리 조회' })
  @ApiResponse({ status: 200, description: '서브카테고리 목록 반환' })
  async findSubcategories(@Param('id') id: string) {
    return this.categoryService.findSubcategories(id);
  }

  @UseGuards(JwtAuthGuard, AuthGuard)
  @Post()
  @Roles('admin')
  @ApiOperation({ summary: '새 카테고리 생성' })
  @ApiResponse({ status: 201, description: '카테고리가 생성됨' })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @UseGuards(JwtAuthGuard, AuthGuard)
  @Put(':id')
  @Roles('admin')
  @ApiOperation({ summary: '카테고리 수정' })
  @ApiResponse({ status: 200, description: '카테고리가 수정됨' })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @UseGuards(JwtAuthGuard, AuthGuard)
  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: '카테고리 삭제' })
  @ApiResponse({ status: 200, description: '카테고리가 삭제됨' })
  async remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
} 