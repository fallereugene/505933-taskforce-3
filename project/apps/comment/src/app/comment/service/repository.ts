import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/contracts';
import { Comment } from '@project/contracts';
import { CommentEntity } from '../entity';
import { CommentQuery } from '../validations';
import { PrismaService } from './prisma';

@Injectable()
export class Repository
  implements CRUDRepository<CommentEntity, Comment, number>
{
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Создание записи
   * @param payload Сущность записи
   */
  async create(payload: CommentEntity) {
    return this.prisma.comment.create({
      data: {
        ...payload,
      },
    });
  }

  /**
   * Поиск записи
   * @param id Уникальный идентификатор
   */
  async findById(id: number) {
    return this.prisma.comment.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Удаление записи
   * @param id Идентификатор записи
   */
  async delete(id: number) {
    await this.prisma.comment.delete({
      where: {
        id: id,
      },
    });
  }

  /**
   * Удаления списка комментариев в разрезе фильма
   * @param taskId Идентификатор задачи
   * @param authorId Автор комментария
   */
  async deleteCommentsList(taskId: number, authorId: string) {
    return this.prisma.comment.deleteMany({
      where: {
        task: taskId,
        author: authorId,
      },
    });
  }

  /**
   * Обновление записи
   * @param id Идентификатор записи
   * @param item Полезная нагрузка
   * @returns Обновленная запись
   */
  async update(id: number, item: Comment) {
    return this.prisma.comment.update({
      where: {
        id,
      },
      data: {
        ...item,
      },
    });
  }

  /**
   * Выборка всех записей по таблице tasks  с учетом фильтрации
   * @param taskId Идентификатор задачи, в разрезе которой осуществляется поиск комментариев
   * @param query Фильтры, переданные в query-параметрах
   * @returns Список записей
   */
  async getList(taskId: number, query: CommentQuery) {
    const { limit, page } = query;
    return this.prisma.comment.findMany({
      where: {
        task: taskId,
      },
      take: limit,
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }
}
