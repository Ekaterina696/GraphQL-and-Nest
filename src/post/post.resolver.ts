import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Post } from './entities/post.entity';
import { PostService } from './post.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @Query(() => Post)
  async post(@Args('id') id: number): Promise<Post> {
    return this.postService.findOne(id);
  }

  @Mutation(() => Post)
  async createPost(
    @Args('title') title: string,
    @Args('content') content: string,
    @Args('authorId') authorId: number,
  ): Promise<Post> {
    return this.postService.create(title, content, authorId);
  }
}
