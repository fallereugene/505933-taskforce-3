import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import {
  TaskStatus,
  Task,
  AccessTokenPayload,
  AvailableRole,
} from '@project/contracts';
import { TaskEntity } from './entity';
import { Repository, AccountRepository } from './service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { PostQuery, AccountQuery, validateStatus } from './validations';
import { EXCEPTION } from '../constants';

@Injectable()
export class TaskService {
  constructor(
    private readonly repository: Repository,
    private readonly accountRepository: AccountRepository
  ) {}

  /**
   * Создание задачи.
   * Создавать задачи могут только авторизованные пользователи
   * @param payload Объект DTO
   * @param tokenPayload Данные access-токена
   * @returns Созданная задача
   */
  async create(
    payload: CreateTaskDto,
    tokenPayload: AccessTokenPayload
  ): Promise<Task> {
    const { id } = tokenPayload;
    const task: Task = {
      ...payload,
      cost: payload.cost ?? 0,
      dueDate: payload.dueDate ?? null,
      image: payload.image ?? '',
      address: payload.address ?? '',
      tags: payload.tags ?? [],
      status: TaskStatus.New,
      contractor: null,
      customer: id,
    };
    const record = new TaskEntity(task);
    const categoryList = await this.repository.getCategoryList();
    const existingCategoryId = categoryList.find(
      (item) => item.name === record.category
    );
    return this.repository.create(record, existingCategoryId?.id);
  }

  /**
   * Получение списка заданий
   * @returns Ненормализованный список заданий
   */
  async getList(query: PostQuery): Promise<Task[]> {
    return this.repository.getRepository(query);
  }

  /**
   * Получение детальной информации о задаче
   * @param id Идентификатор задачи
   * @returns Детальная информация о задаче + дополнительные данные (количество откликов, информация о пользователе и т.д.)
   */
  async findById(id: number): Promise<Task> {
    const record = await this.repository.findById(id);
    if (!record) {
      throw new NotFoundException(EXCEPTION.NotFoundTask);
    }
    return record;
  }

  async findByAccount(query: AccountQuery) {
    const { role, roleId } = query;
    return this.repository.findByAccount(role as AvailableRole, roleId);
  }

  /**
   * Обновление задачи.
   * @param id Идентификатор задачи
   * @param payload Объект DTO
   * @param tokenPayload Данные access-токена
   * @returns Детальная информация о задаче
   */
  async update(
    id: number,
    payload: UpdateTaskDto,
    tokenPayload: AccessTokenPayload
  ): Promise<Task> {
    const record = await this.findById(id);
    const { id: userId, role } = tokenPayload;
    const isNewStatusValid = validateStatus(
      record.status,
      payload.status,
      role
    );

    if (
      ![record.customer, record.contractor].includes(userId) ||
      !isNewStatusValid
    ) {
      throw new BadRequestException(EXCEPTION.NotValidStatusOrRole);
    }

    const shouldSetContractor =
      role === 'customer' &&
      record.status === TaskStatus.New &&
      payload.contractor;

    if (shouldSetContractor) {
      const isVacantContractor = !(
        await this.repository.findByAccount(
          'contractor',
          payload.contractor,
          TaskStatus.InProgress
        )
      ).length;
      if (!isVacantContractor) {
        throw new BadRequestException(EXCEPTION.NotVacantContractor);
      }
    }

    return this.repository.update(id, {
      ...record,
      contractor: payload.contractor ?? record.contractor,
      status: payload.status ?? record.status,
    });
  }

  /**
   * Удаление существующего задания
   * @param id Идентификатор задачи
   * @param tokenPayload Данные access-токена
   */
  async delete(id: number, tokenPayload: AccessTokenPayload): Promise<void> {
    const record = await this.findById(id);
    if (record.customer !== tokenPayload.id) {
      throw new UnauthorizedException();
    }
    await this.repository.delete(id);
    // TODO: сделать запрос к сервису комментариев
    // Удаление задания приводит к удалению всех оставленных к нему комментариев.
  }
}
