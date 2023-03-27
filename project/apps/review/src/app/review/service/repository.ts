import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { CRUDRepository, Review } from '@project/contracts';
import { ReviewEntity } from '../entity';

@Injectable()
export class Repository
  implements CRUDRepository<ReviewEntity, string, Review>
{
  private repository: { [key: string]: Review } = {};

  /**
   * Сохранение сущности
   * @param payload Объект
   * @returns Сохраненная сущность
   */
  async create(payload: any): Promise<Review> {
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
  async findById(id: string): Promise<Review | null> {
    return this.repository[id] ?? null;
  }

  /**
   * Обновление данных
   * @param id Уникальный идентификатор, по которому нужно выполнить обновление
   * @param item Обновленные данные
   * @returns Обновленная сущность
   */
  async update(id: string, item: Review): Promise<Review> {
    const record = {
      ...this.repository[id],
      ...item,
    };
    this.repository[record._id] = record;
    return record;
  }

  /**
   * Удаление сущности
   * @param id Идентификатор сущности
   */
  async delete(id: string): Promise<void> {
    delete this.repository[id];
  }
}
