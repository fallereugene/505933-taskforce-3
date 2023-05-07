import {
  Controller,
  Post,
  Body,
  Req,
  Headers,
  Get,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { fillObject, Roles } from '@project/utils/utils-core';
import { ReviewRdo, RatingListRdo } from '@project/contracts';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto';

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
  @Post('/')
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
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Access Forbidden',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
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

  /**
   * Получение списка рейтинга пользователей
   */
  @Get('/rating')
  @ApiOperation({ summary: 'Creating new comment' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Rating list',
    type: RatingListRdo,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  async getRatingList() {
    const records = await this.reviewService.getRatingList();
    return records.map((r) => fillObject(RatingListRdo, r));
  }
}
