import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content, ContentDocument } from './schemas/content.schema';
import { Comment, CommentDocument } from './schemas/comment.schema';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Content.name) private contentModel: Model<ContentDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async findAll(): Promise<Content[]> {
    return this.contentModel.find().populate('comments').exec();
  }

  async findById(id: string): Promise<Content> {
    return this.contentModel.findById(id).populate('comments').exec();
  }

  async create(content: Partial<Content>): Promise<Content> {
    const createdContent = new this.contentModel(content);
    return createdContent.save();
  }

  async update(id: string, content: Partial<Content>): Promise<Content> {
    return this.contentModel
      .findByIdAndUpdate(id, content, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Content> {
    return this.contentModel.findByIdAndDelete(id).exec();
  }

  async addComment(contentId: string, comment: Partial<Comment>): Promise<Comment> {
    const createdComment = new this.commentModel(comment);
    const savedComment = await createdComment.save();
    
    await this.contentModel.findByIdAndUpdate(
      contentId,
      { $push: { comments: savedComment._id } },
    );
    
    return savedComment;
  }
} 