import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['author'] });
  }

  async findOne(id: number): Promise<Post> {
    return this.postRepository.findOne({ where: { id }, relations: ['author'] });
  }

  async create(title: string, content: string, authorId: number): Promise<Post> {
    const user = await this.userRepository.findOne({ where: { id: authorId } });
    if (!user) {
      throw new Error('User not found');
    }
    const post = this.postRepository.create({ title, content, author: user });
    return this.postRepository.save(post);
  }
}