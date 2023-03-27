import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { fillObject } from '@project/utils/utils-core';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto';
import { ReviewRdo } from './rdo';

@ApiTags('Review service')
@Controller({
  version: '1',
  path: 'review',
})
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  /**
   * Добавление отзыва
   * @param dto Объект DTO
   * @returns Детали созданного отзыва
   */
  @Post()
  @ApiOperation({ summary: 'Creating new comment' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'New comment has been successfully created',
    type: ReviewRdo,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  async create(@Body() dto: CreateReviewDto): Promise<ReviewRdo> {
    const payload = await this.reviewService.create(dto);
    return fillObject(ReviewRdo, payload);
  }
}
