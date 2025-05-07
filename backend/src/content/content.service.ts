import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Content, ContentDocument } from '../schemas/content.schema';
import { Comment, CommentDocument } from '../schemas/comment.schema';
import { User } from '../schemas/user.schema';

export interface FrontendContent {
  id: string;
  title: string;
  content: string;
  category: string;
  subcategory?: string;
  author: string;
  createdAt: string;
  views: number;
  status: 'published' | 'draft' | 'deleted';
  likes: number;
  comments: Comment[];
  image?: string;
}

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Content.name) private contentModel: Model<ContentDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  private toFrontendContent(content: ContentDocument): FrontendContent {
    const authorObj = content.author as User;
    return {
      id: content._id.toString(),
      title: content.title,
      content: content.content,
      category: content.category,
      subcategory: content.subcategory,
      author: authorObj ? authorObj.username : '',
      createdAt: content.createdAt?.toISOString?.() || '',
      views: content.views,
      status: content.status,
      likes: content.likes,
      comments: content.comments || [],
      image: content.image,
    };
  }

  async findAll(): Promise<FrontendContent[]> {
    const contents = await this.contentModel
      .find()
      .populate<{ author: User }>('author', 'username')
      .populate('comments')
      .exec();
    return contents.map(content => this.toFrontendContent(content));
  }

  async findByCategory(category: string): Promise<FrontendContent[]> {
    const contents = await this.contentModel
      .find({ category })
      .populate<{ author: User }>('author', 'username')
      .populate('comments')
      .exec();
    return contents.map(content => this.toFrontendContent(content));
  }

  async findBySubcategory(category: string, subcategory: string): Promise<FrontendContent[]> {
    const contents = await this.contentModel
      .find({ 
        category,
        subcategory: subcategory === 'all' ? { $exists: true } : subcategory
      })
      .populate<{ author: User }>('author', 'username')
      .populate('comments')
      .exec();
    return contents.map(content => this.toFrontendContent(content));
  }

  async findById(id: string): Promise<FrontendContent> {
    const content = await this.contentModel
      .findById(id)
      .populate<{ author: User }>('author', 'username')
      .populate('comments')
      .exec();
    
    if (!content) {
      throw new Error('컨텐츠를 찾을 수 없습니다.');
    }

    return this.toFrontendContent(content);
  }

  async create(content: Partial<Content>): Promise<FrontendContent> {
    const createdContent = new this.contentModel(content);
    const savedContent = await createdContent.save();
    return this.toFrontendContent(savedContent);
  }

  async update(id: string, content: Partial<Content>): Promise<FrontendContent> {
    const updatedContent = await this.contentModel
      .findByIdAndUpdate(id, content, { new: true })
      .populate<{ author: User }>('author', 'username')
      .populate('comments')
      .exec();

    if (!updatedContent) {
      throw new Error('컨텐츠를 찾을 수 없습니다.');
    }

    return this.toFrontendContent(updatedContent);
  }

  async delete(id: string): Promise<void> {
    const result = await this.contentModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new Error('컨텐츠를 찾을 수 없습니다.');
    }
  }

  async addComment(contentId: string, comment: Partial<Comment>): Promise<FrontendContent> {
    const createdComment = new this.commentModel(comment);
    const savedComment = await createdComment.save();
    
    const updatedContent = await this.contentModel
      .findByIdAndUpdate(
        contentId,
        { $push: { comments: savedComment._id } },
        { new: true }
      )
      .populate<{ author: User }>('author', 'username')
      .populate('comments')
      .exec();

    if (!updatedContent) {
      throw new Error('컨텐츠를 찾을 수 없습니다.');
    }

    return this.toFrontendContent(updatedContent);
  }
} 