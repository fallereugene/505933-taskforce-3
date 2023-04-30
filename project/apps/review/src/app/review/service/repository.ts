import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/contracts';
import { Review } from '@project/contracts';
import { ReviewEntity } from '../entity';
import { PrismaService } from './prisma';

@Injectable()
export class Repository
  implements CRUDRepository<ReviewEntity, Review, number>
{
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Создание записи
   * @param payload Сущность записи
   */
  async create(payload: ReviewEntity) {
    return this.prisma.review.create({
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
    return this.prisma.review.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Поиск записи в разрезе заказчика
   * @param id Уникальный идентификатор записи
   */
  async findByTask(id: number) {
    return this.prisma.review.findFirst({
      where: {
        taskId: id,
      },
    });
  }

  /**
   * Удаление записи
   * @param id Идентификатор записи
   */
  async delete(id: number) {
    await this.prisma.review.delete({
      where: {
        id: id,
      },
    });
  }

  /**
   * Обновление записи
   * @param id Идентификатор записи
   * @param item Полезная нагрузка
   * @returns Обновленная запись
   */
  async update(id: number, item: Review) {
    return this.prisma.review.update({
      where: {
        id,
      },
      data: {
        ...item,
      },
    });
  }
}
