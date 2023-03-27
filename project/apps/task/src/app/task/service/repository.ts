import { Injectable } from '@nestjs/common';
import { CRUDRepository, Task } from '@project/contracts';
import { TaskEntity } from '../entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class Repository implements CRUDRepository<TaskEntity, string, Task> {
  private repository: { [key: string]: Task } = {};

  /**
   * Сохранение сущности Задание
   * @param payload Сущность Задание
   * @returns Объект пользователя
   */
  async create(payload: TaskEntity): Promise<Task> {
    const record = {
      ...payload,
      _id: uuidv4(),
    };

    this.repository[record._id] = record;

    return record;
  }

  /**
   * Поиск пользователя по идентификатору
   * @param id Идентификатор пользователя
   * @returns Объект пользователя
   * В случае, если пользователь не найден - null.
   */
  async findById(id: string): Promise<Task | null> {
    return this.repository[id] ?? null;
  }

  /**
   * Обновление данных
   * @param id Уникальный идентификатор, по которому нужно выполнить обновление
   * @param item Обнорвленные данный
   * @returns Объект пользователя
   */
  async update(id: string, item: Task): Promise<Task> {
    const record = {
      ...this.repository[id],
      ...item,
    };
    this.repository[record._id] = record;
    return record;
  }

  /**
   * Получение коллекции
   * @returns
   */
  async getRepository(): Promise<Task[]> {
    // TODO: в целевой реализации будет поиск по идентификатору авторизованного пользователя
    return Object.values(this.repository);
  }

  /**
   * Удаление сущности
   * @param id Идентификатор сущности
   */
  async delete(id: string): Promise<void> {
    delete this.repository[id];
  }
}
