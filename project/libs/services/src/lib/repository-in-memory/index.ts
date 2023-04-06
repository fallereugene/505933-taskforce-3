import { v4 as uuidv4 } from 'uuid';
import { CRUDRepository } from '@project/contracts';

export class RepositoryInMemory<E, R> implements CRUDRepository<E, R> {
  protected repository: { [key: string]: R } = {};

  /**
   * Создание сущности и сохранение in-memory
   * @param payload Объект сущности
   * @returns Созданный объект
   */
  async create(payload: E): Promise<R> {
    const _id = uuidv4();
    const record = {
      ...payload,
      _id,
    } as R;

    this.repository[_id] = record;

    return record;
  }

  /**
   * Поиск сущности по переданному идентификатору
   * @param id Переданный идентификатор
   * @returns Объект сущности или null в случае, если объект отсутствует
   */
  async findById(id: string): Promise<R | null> {
    return this.repository[id] ?? null;
  }

  /**
   * Обновление сущности
   * @param id Переданный идентификатор
   * @param item Обновленные данные
   * @returns Обновленный объект сущности
   */
  async update(id: string, item: R): Promise<R> {
    const record = {
      ...this.repository[id],
      ...item,
    } as R;

    this.repository[id] = record;

    return record;
  }

  /**
   * Удаление сущности из коллекции
   * @param id Идентификатор сущности
   */
  async delete(id: string): Promise<void> {
    delete this.repository[id];
  }
}
