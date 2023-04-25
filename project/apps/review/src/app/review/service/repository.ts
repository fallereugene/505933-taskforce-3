import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/contracts';
import { PrismaServiceReview } from '@project/services';
import { Review } from '@project/contracts';
import { ReviewEntity } from '../entity';

@Injectable()
export class Repository
  implements CRUDRepository<ReviewEntity, Review, number>
{
  constructor(private readonly prisma: PrismaServiceReview) {}

  /**
   * Создание записи
   * @param payload Сущность записи
   */
  async create(payload: ReviewEntity) {
    return this.prisma.review.create({
      data: {
        ...payload,
        // TODO: Далее идентификатор пользователя будет забираться из JWT-токена
        customer: '6441aa5173cfe6ec7f835cba',
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
