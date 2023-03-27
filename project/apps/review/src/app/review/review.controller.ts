import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReviewService } from './review.service';

@ApiTags('Review service')
@Controller({
  version: '1',
  path: 'review',
})
export class ReviewController {
  constructor(private readonly commentService: ReviewService) {}
}
