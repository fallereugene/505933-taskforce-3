import {
  Controller,
  Post,
  Body,
  Req,
  Headers,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { fillObject, Roles } from '@project/utils/utils-core';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto';
import { ReviewRdo } from './rdo';

@ApiTags('Review service')
@Controller({
  version: '1',
  path: 'reviews',
})
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  /**
   * Добавление отзыва
   * @param dto Объект DTO
   * @param authorization Параметр авторизации, переданный в заголовке
   * @param request Объект запроса
   * @returns Детали созданного отзыва
   */
  @Post()
  @Roles('customer')
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
  async create(
    @Body() dto: CreateReviewDto,
    @Headers('authorization') authorization: string,
    @Req() request: Request
  ): Promise<ReviewRdo> {
    const { user } = request;
    const payload = await this.reviewService.create(dto, user, authorization);
    return fillObject(ReviewRdo, payload);
  }
}
