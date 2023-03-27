import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CRUDRepository, Comment } from '@project/contracts';
import { CommentEntity } from '../entity';

@Injectable()
export class Repository
  implements CRUDRepository<CommentEntity, string, Comment>
{
  private repository: { [key: string]: Comment } = {};

  /**
   * Сохранение сущности
   * @param payload Объект
   * @returns Сохраненная сущность
   */
  async create(payload: any): Promise<Comment> {
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
  async findById(id: string): Promise<Comment | null> {
    return this.repository[id] ?? null;
  }

  /**
   * Обновление данных
   * @param id Уникальный идентификатор, по которому нужно выполнить обновление
   * @param item Обновленные данные
   * @returns Обновленная сущность
   */
  async update(id: string, item: Comment): Promise<Comment> {
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
  async getRepository(): Promise<Comment[]> {
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

  /**
   * Удаления списка комментариев в разрезе фильма
   * @param taskId Идентификатор задачи
   */
  async deleteCommentsList(taskId: string) {
    Object.entries(this.repository).forEach(([key, item]) => {
      if (item.task === taskId) {
        delete this.repository[key];
      }
    });
  }
}
