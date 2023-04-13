import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus, Task } from '@project/contracts';
import { Timezone } from '@project/services';
import { TaskEntity } from './entity';
import { Repository } from './service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
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
    const task = {
      ...payload,
      cost: payload.cost ?? 0,
      dueDate: payload.dueDate ?? null,
      image: payload.image ?? '',
      address: payload.address ?? '',
      tags: payload.tags ?? [],
      status: TaskStatus.New,
      contractor: null,
      customer: '',
    };
    const record = new TaskEntity(task);

    return this.repository.create(record);
  }

  /**
   * Получение списка заданий
   * @returns Ненормализованный список заданий
   */
  async getList(): Promise<Task[]> {
    return this.repository.getRepository();
  }

  /**
   * Получение детальной информации о задаче
   * @param id Идентификатор задачи
   * @returns Детальная информация о задаче + дополнительные данные (количество откликов, информация о пользователе и т.д.)
   */
  async findById(id: string): Promise<Task> {
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
  async update(id: string, payload: UpdateTaskDto): Promise<Task> {
    const record = await this.findById(id);
    return this.repository.update(id, { ...record, ...payload });
  }

  /**
   * Удаление существующего задания
   * @param id Идентификатор задачи
   */
  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.repository.delete(id);
  }
}
