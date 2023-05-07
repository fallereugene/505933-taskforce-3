import { Injectable } from '@nestjs/common';
import { Review } from '@project/contracts';
import { ReviewEntity } from '../entity';
import { PrismaService } from './prisma';

@Injectable()
export class Repository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Создание записи
   * @param payload Сущность записи
   * @param existingRatingId Идентификатор существующей записи
   */
  async create(payload: ReviewEntity, existingRatingId: number) {
    const { contractor, ...rest } = payload;
    const record = await this.prisma.review.create({
      data: {
        ...rest,
        ...(existingRatingId
          ? { contractorId: existingRatingId }
          : {
              contractor: {
                create: {
                  contractorId: contractor,
                  totalRating: payload.rating,
                },
              },
            }),
      },
    });
    return {
      ...record,
      contractor,
    };
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
   * Поиск отзывов по идентификатору пользователя в разрезе роли
   * @param id Уникальный идентификатор пользователя
   * @returns Список отзывов
   */
  async findByContractor(contractorId: number) {
    return this.prisma.review.findMany({
      where: {
        contractorId,
      },
    });
  }

  /**
   * Поиск записи по идентификатору исполнителя в таблице рейтинга
   * @param contractorId Идентификатор аккаунта
   */
  async getRatingByContractor(contractorId: string) {
    return this.prisma.rating.findFirst({
      where: {
        contractorId,
      },
    });
  }

  /**
   * Обновление записи
   * @param id Идентификатор записи
   * @param rating Обновленный рейтинг
   */
  async updateRating(id: number, rating: number) {
    return this.prisma.rating.update({
      data: {
        totalRating: rating,
      },
      where: {
        id,
      },
    });
  }

  /**
   * Получение всех записей из таблицы ratings
   */
  async getRatingList() {
    return this.prisma.rating.findMany({
      orderBy: {
        totalRating: 'desc',
      },
    });
  }
}
