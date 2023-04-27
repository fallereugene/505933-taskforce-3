import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { TaskStatus, Task } from '@project/contracts';
import { TaskEntity } from './entity';
import { Repository } from './service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { PostQuery, validateStatus } from './validations';
import { EXCEPTION } from '../constants';

@Injectable()
export class TaskService {
  constructor(private readonly repository: Repository) {}

  /**
   * Создание задачи.
   * Создавать задачи могут только авторизованные пользователи
   * @param payload Объект DTO
   * @returns Созданная задача
   */
  async create(payload: CreateTaskDto): Promise<Task> {
    // TODO: реализовать запрос к сервису пользователей
    const tokenPayload = await Promise.resolve({
      id: '64498ada0239cc6788ac2691',
      email: 'john@doe.ru',
      role: 'customer',
      lastname: 'John',
      firstname: 'Doe',
    });
    if (tokenPayload.role !== 'customer') {
      throw new UnauthorizedException();
    }
    const task: Task = {
      ...payload,
      cost: payload.cost ?? 0,
      dueDate: payload.dueDate ?? null,
      image: payload.image ?? '',
      address: payload.address ?? '',
      tags: payload.tags ?? [],
      status: TaskStatus.New,
      contractor: null,
      customer: tokenPayload.id,
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
    // TODO: проверить, что пользователь аутентифицированный
    const record = await this.repository.findById(id);
    if (!record) {
      throw new NotFoundException(EXCEPTION.NotFoundTask);
    }
    return record;
  }

  /**
   * Обновление задачи.
   * @param id Идентификатор задачи
   * @param payload Объект DTO
   * @returns Детальная информация о задаче
   */
  async update(id: number, payload: UpdateTaskDto): Promise<Task> {
    const record = await this.findById(id);
    // TODO: реализовать запрос к сервису пользователей
    const tokenPayload = await Promise.resolve({
      id: '64498ada0239cc6788ac2691',
      email: 'john@doe.ru',
      role: 'customer',
      lastname: 'John',
      firstname: 'Doe',
    });
    const shouldSetContractor = payload.status === TaskStatus.New;
    const isNewStatusValid = validateStatus(
      record.status,
      payload.status,
      tokenPayload.role as any
    );
    if (!isNewStatusValid) {
      throw new BadRequestException(EXCEPTION.NotValidStatus);
    }
    const isVacantContractor = !(
      await this.repository.findByContractor(payload.contractor)
    ).length;

    if (!isVacantContractor && shouldSetContractor) {
      throw new BadRequestException(EXCEPTION.NotVacantContractor);
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
   */
  async delete(id: number): Promise<void> {
    // TODO: реализовать запрос к сервису пользователей
    const tokenPayload = await Promise.resolve({
      id: '64498ada0239cc6788ac2691',
      email: 'john@doe.ru',
      role: 'contractor',
      lastname: 'John',
      firstname: 'Doe',
    });
    const record = await this.findById(id);
    if (record.customer !== tokenPayload.id) {
      throw new UnauthorizedException();
    }
    await this.repository.delete(id);
    // TODO: сделать запрос к сервису комментариев
    // Удаление задания приводит к удалению всех оставленных к нему комментариев.
  }
}
