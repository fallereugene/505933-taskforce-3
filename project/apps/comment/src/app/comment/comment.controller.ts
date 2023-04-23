import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { fillObject } from '@project/utils/utils-core';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto';
import { CommentRdo } from './rdo';
import { PostQuery } from './validations';

@ApiTags('Comment service')
@Controller({
  version: '1',
  path: 'comments',
})
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  /**
   * Создание комментария
   * @param dto Объект DTO
   * @returns Детали созданного комментария
   */
  @Post()
  @ApiOperation({ summary: 'Creating new comment' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'New comment has been successfully created',
    type: CommentRdo,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  async create(@Body() dto: CreateCommentDto): Promise<CommentRdo> {
    const payload = await this.commentService.create(dto);
    return fillObject(CommentRdo, payload);
  }

  /**
   * Получение списка комментариев в разрезе задания
   * @returns Список комментариев
   */
  @Get(':taskId')
  @ApiOperation({ summary: 'Getting tasks list' })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'Page number. It is used for paginating.',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    description: 'Max limit records.',
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tasks list',
    type: CommentRdo,
    isArray: true,
  })
  async getList(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Query() query: PostQuery
  ): Promise<CommentRdo[]> {
    const records = await this.commentService.getList(taskId, query);
    return records.map((r) => fillObject(CommentRdo, r));
  }

  /**
   * Удаление отдельного комментария
   * @param commentId Идентификатор комментария
   */
  @Delete(':taskId/:commentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deleting existing comment' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Comment has been successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  async deleteItem(
    @Param('commentId', ParseIntPipe) commentId: number
  ): Promise<void> {
    await this.commentService.deleteItem(commentId);
  }

  /**
   * Удаление всех комментариев в разрезе определенной задачи
   * @param taskId Идентификатор задачи
   */
  @Delete(':taskId/')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deleting all comments belonging to the task' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'All comments has been successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  async deleteList(
    @Param('taskId', ParseIntPipe) taskId: number
  ): Promise<void> {
    await this.commentService.deleteList(taskId);
  }
}
