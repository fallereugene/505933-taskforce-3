import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/contracts';
import { PrismaService } from '@project/services';
import { Comment } from '@project/contracts';
import { CommentEntity } from '../entity';

@Injectable()
export class Repository
  implements CRUDRepository<CommentEntity, Comment, number>
{
  constructor(private readonly prisma: PrismaService) {}

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
   */
  async deleteCommentsList(taskId: number) {
    return this.prisma.comment.deleteMany({
      where: {
        task: taskId,
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
   * @param query Фильтры, переданные в query-параметрах
   * @returns Список записей
   */
  async getList(taskId: number) {
    // const { limit, city, page, category, sorting, tag } = query;
    return this.prisma.comment.findMany({
      where: {
        task: taskId,
      },
      // orderBy: {
      //   [sorting]: 'desc',
      // },
      // take: limit,
      // skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }
}
