import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment, CommentDocument } from '../schemas/comment.schema';
import { UserService } from '../user/user.service';
import { User } from '../schemas/user.schema';

export interface FrontendComment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  status: 'active' | 'deleted';
  postTitle?: string;
  contentId?: string;
}

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private readonly userService: UserService,
  ) {}

  private toFrontendComment(comment: CommentDocument): FrontendComment {
    const author = comment.author as unknown as User;
    return {
      id: comment._id.toString(),
      content: comment.content,
      author: author.username,
      createdAt: comment.createdAt.toISOString(),
      status: comment.status,
      contentId: comment.contentId.toString(),
    };
  }

  async create(comment: Partial<Comment>): Promise<FrontendComment> {
    const user = await this.userService.findById(String(comment.author));
    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }

    const createdComment = new this.commentModel({
      ...comment,
      author: user.id,
    });
    const savedComment = await createdComment.save();
    return this.toFrontendComment(savedComment);
  }

  async findAll(contentId: string): Promise<FrontendComment[]> {
    const comments = await this.commentModel
      .find({ contentId, status: 'active' })
      .populate<{ author: User }>('author', 'username')
      .sort({ createdAt: -1 })
      .exec();

    return comments.map(comment => this.toFrontendComment(comment));
  }

  async findOne(id: string): Promise<FrontendComment> {
    const comment = await this.commentModel
      .findById(id)
      .populate<{ author: User }>('author', 'username')
      .exec();

    if (!comment) {
      throw new Error('댓글을 찾을 수 없습니다.');
    }

    return this.toFrontendComment(comment);
  }

  async update(id: string, comment: Partial<Comment>): Promise<FrontendComment> {
    const updatedComment = await this.commentModel
      .findByIdAndUpdate(id, comment, { new: true })
      .populate<{ author: User }>('author', 'username')
      .exec();

    if (!updatedComment) {
      throw new Error('댓글을 찾을 수 없습니다.');
    }

    return this.toFrontendComment(updatedComment);
  }

  async delete(id: string): Promise<FrontendComment> {
    const deletedComment = await this.commentModel
      .findByIdAndUpdate(id, { status: 'deleted' }, { new: true })
      .populate<{ author: User }>('author', 'username')
      .exec();

    if (!deletedComment) {
      throw new Error('댓글을 찾을 수 없습니다.');
    }

    return this.toFrontendComment(deletedComment);
  }

  async like(id: string, userId: string): Promise<FrontendComment> {
    const comment = await this.commentModel
      .findById(id)
      .populate<{ author: User }>('author', 'username')
      .exec();

    if (!comment) {
      throw new Error('댓글을 찾을 수 없습니다.');
    }

    const userIdObj = new Types.ObjectId(userId);
    const likeIndex = comment.likes.indexOf(userIdObj);

    if (likeIndex === -1) {
      comment.likes.push(userIdObj);
    } else {
      comment.likes.splice(likeIndex, 1);
    }

    const updatedComment = await comment.save();
    return this.toFrontendComment(updatedComment);
  }
} 