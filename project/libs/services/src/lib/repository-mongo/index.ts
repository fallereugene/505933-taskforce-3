import { Model } from 'mongoose';
import { CRUDRepository } from '@project/contracts';

export class RepositoryMongo<E, R, M> implements CRUDRepository<E, R> {
  constructor(private readonly model: Model<M>) {}

  /**
   * Создание сущности и сохранение в БД
   * @param payload Объект сущности
   * @returns Созданный объект
   */
  async create(payload: E): Promise<R> {
    const record = new this.model(payload);
    return record.save() as R;
  }

  /**
   * Поиск сущности по переданному идентификатору
   * @param id Переданный идентификатор
   * @returns Объект сущности или null в случае, если объект отсутствует
   */
  async findById(id: string): Promise<R | null> {
    const record = await this.model.findOne({ _id: id }).lean().exec();
    return (record as R) ?? null;
  }

  /**
   * Удаление сущности из базы данных
   * @param id Идентификатор сущности
   */
  async delete(id: string): Promise<void> {
    this.model.deleteOne({ _id: id }).exec();
  }

  /**
   * Обновление сущности
   * @param id Переданный идентификатор
   * @param item Обновленные данные
   * @returns Обновленный объект сущности
   */
  async update(id: string, item: R): Promise<R> {
    const record = {
      ...item,
    };
    return this.model
      .findByIdAndUpdate(id, record, { new: true })
      .lean()
      .exec() as R;
  }
}
