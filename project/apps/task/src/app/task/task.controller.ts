import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Query,
  ParseIntPipe,
  Req,
  Headers,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { fillObject, NoAuth, Roles } from '@project/utils/utils-core';
import { City, TaskStatus, Role, TaskRdo } from '@project/contracts';
import { PostQuery, AssignedQuery, AccountQuery, Sorting } from './validations';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@ApiTags('Task service')
@Controller({
  version: '1',
  path: 'tasks',
})
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  /**
   * Создание нового задания
   * @param dto Объект DTO
   * @returns Детали созданного задания
   */
  @Post()
  @Roles('customer')
  @ApiOperation({ summary: 'Creating new task' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'New task has been successfully created',
    type: TaskRdo,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  async create(
    @Body() dto: CreateTaskDto,
    @Req() request: Request
  ): Promise<TaskRdo> {
    const { user } = request;
    const payload = await this.taskService.create(dto, user);
    return fillObject(TaskRdo, payload);
  }

  /**
   * Авторизованные пользователи с ролью Исполнитель могут запрашивать список заданий со статусом Новый
   * @returns Список заданий
   */
  @Get()
  @Roles('contractor')
  @ApiOperation({ summary: 'Getting tasks list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tasks list',
    type: TaskRdo,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Access forbidden.',
  })
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
  @ApiQuery({
    name: 'category',
    type: Number,
    description: 'Selection by category identifier.',
    required: false,
  })
  @ApiQuery({
    name: 'tag',
    type: String,
    description: 'Selection by tag.',
    required: false,
  })
  @ApiQuery({
    name: 'city',
    enum: City,
    description: 'Selection by city.',
    required: false,
  })
  @ApiQuery({
    name: 'sorting',
    enum: Sorting,
    description: 'Selection by passed sort.',
    required: false,
  })
  async getList(
    @Query() query: PostQuery,
    @Headers('authorization') authorization: string
  ): Promise<TaskRdo[]> {
    const token = authorization.split(' ')[1];
    const records = await this.taskService.getList(query, token);
    return records.map((r) => fillObject(TaskRdo, r));
  }

  /**
   * Получение списка заданий, закреплённых за пользователями.
   * @param query Query-параметры
   * @param request Объект запроса
   */
  @Get('/mylist')
  @ApiOperation({ summary: "Getting task's list assigned to the account" })
  @ApiQuery({
    name: 'status',
    enum: TaskStatus,
    description: 'Selection by passed status.',
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  async getAssignedList(
    @Query() query: AssignedQuery,
    @Req() request: Request
  ) {
    const { user } = request;
    return this.taskService.getAssignedList(query, user);
  }

  /**
   * Поиск заданий в разрезе аккаунта (заказчик или исполнитель)
   * @param query Query-параметры запроса
   * @param request Объект запроса
   */
  @Get('/account')
  @ApiOperation({ summary: 'Getting tasks list according account.' })
  @ApiQuery({
    name: 'role',
    enum: Role,
    description: "Account's role.",
    required: false,
  })
  @ApiQuery({
    name: 'id',
    description: "Account's identifier.",
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tasks list',
    type: TaskRdo,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  async getListByAccount(@Query() query: AccountQuery): Promise<TaskRdo[]> {
    const { role, id } = query;
    const records = await this.taskService.findByAccount(role, id);
    return records.map((r) => fillObject(TaskRdo, r));
  }

  /**
   * Получение детальной информации о задаче
   * @param taskId Идентификатор задачи
   * @returns Детальная информация о задаче + дополнительные данные (количество откликов, информация о пользователе и т.д.)
   */
  @Get(':taskId')
  @NoAuth()
  @ApiOperation({ summary: 'Getting detailed information about task' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task details',
    type: TaskRdo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  async findById(
    @Param('taskId', ParseIntPipe) taskId: number
  ): Promise<TaskRdo> {
    const payload = await this.taskService.findById(taskId);
    return fillObject(TaskRdo, payload);
  }

  /**
   * Обновление задачи.
   * Доступно обновление статуса, исполнителя.
   * @param taskId Идентификатор задачи
   * @param dto Объект DTO
   * @returns Детальная информация о задаче
   */
  @Patch(':taskId')
  @ApiOperation({ summary: 'Update existing task' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task details',
    type: TaskRdo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  async update(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() dto: UpdateTaskDto,
    @Req() request: Request
  ): Promise<TaskRdo> {
    const { user } = request;
    const payload = await this.taskService.update(taskId, dto, user);
    return fillObject(TaskRdo, payload);
  }

  /**
   * Удаление существующего задания
   * @param taskId Идентификатор задачи
   * @param request Объект запроса
   * @param authorization Значение, передаваемое в заголовке Authorization
   */
  @Delete(':taskId')
  @Roles('customer')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete existing task' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Task has been successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  async delete(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Req() request: Request,
    @Headers('authorization') authorization: string
  ): Promise<void> {
    const { user } = request;
    const token = authorization.split(' ')[1];
    await this.taskService.delete(taskId, user, token);
  }
}
