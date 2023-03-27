import { Injectable } from '@nestjs/common';
import { CRUDRepository, Task } from '@project/contracts';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class Repository implements CRUDRepository<any, string, Task> {
  private repository: { [key: string]: Task } = {};

  /**
   * Сохранение сущности
   * @param payload Объект
   * @returns Сохраненная сущность
   */
  async create(payload: any): Promise<Task> {
    const record = {
      ...payload,
      _id: uuidv4(),
    };

    this.repository[record._id] = record;

    return record;
  }

  /**
   * Поиск сущности по идентификатору
   * @param id Идентификатор, по которому осуществляется поиск в коллекции
   * @returns Найденная сущность
   */
  async findById(id: string): Promise<Task | null> {
    return this.repository[id] ?? null;
  }

  /**
   * Обновление данных
   * @param id Уникальный идентификатор, по которому нужно выполнить обновление
   * @param item Обновленные данные
   * @returns Обновленная сущность
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
   * Получение всей коллекции коллекции
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
