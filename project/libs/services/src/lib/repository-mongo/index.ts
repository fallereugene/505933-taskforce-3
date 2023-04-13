import { Model, HydratedDocument } from 'mongoose';
import { CRUDRepository } from '@project/contracts';

export class RepositoryMongo<E, R> implements CRUDRepository<E, R> {
  constructor(private readonly model: Model<HydratedDocument<R>>) {}

  /**
   * Создание сущности и сохранение в БД
   * @param payload Объект сущности
   * @returns Созданный объект
   */
  async create(payload: E): Promise<HydratedDocument<R>> {
    const record = new this.model(payload);
    return record.save();
  }

  /**
   * Поиск сущности по переданному идентификатору
   * @param id Переданный идентификатор
   * @returns Объект сущности или null в случае, если объект отсутствует
   */
  async findById(id: string): Promise<HydratedDocument<R> | null> {
    const record = await this.model.findOne({ _id: id }).exec();
    return record ?? null;
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
  async update(id: string, item: R): Promise<HydratedDocument<R>> {
    return this.model.findByIdAndUpdate(id, { ...item }, { new: true }).exec();
  }
}
