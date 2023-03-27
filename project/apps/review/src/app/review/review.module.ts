import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Repository } from './service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, Repository],
})
export class ReviewModule {}
