import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Repository, RepositoryMemory, TaskRepository } from './service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, Repository, RepositoryMemory, TaskRepository],
})
export class ReviewModule {}
