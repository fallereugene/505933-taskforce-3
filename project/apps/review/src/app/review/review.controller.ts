import {
  Controller,
  Post,
  Body,
  Req,
  Headers,
  Get,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { fillObject, NoAuth, Roles } from '@project/utils/utils-core';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto';
import { ReviewRdo } from './rdo';
import { ReviewQuery } from './validations';

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
   * Поиск отзывов по идентификатору пользователя в разрезе роли
   * @param id Уникальный идентификатор пользователя
   * @param query Query-параметры
   * @returns Список отзывов
   */
  @Get('/:id')
  @NoAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Review list',
    type: ReviewRdo,
  })
  @ApiOperation({ summary: 'Getting review list by identifier' })
  async findByAccount(@Param('id') id: string, @Query() query: ReviewQuery) {
    const { role = 'customer' } = query;
    const payload = await this.reviewService.findByAccount(id, role);
    return fillObject(ReviewRdo, payload);
  }
}
