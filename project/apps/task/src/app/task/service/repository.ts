import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/contracts';
import { PrismaService } from '@project/services';
import { Task, TaskStatus } from '@project/contracts';
import { TaskEntity } from '../entity';
import { PostQuery } from '../validations';

@Injectable()
export class Repository implements CRUDRepository<TaskEntity, Task> {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Создание записи Задача (Task)
   * @param payload Полезная нагрузка
   */
  async create(payload: TaskEntity) {
    const { category, ...rest } = payload;
    const record = await this.prisma.task.create({
      data: {
        ...rest,
        category: {
          create: {
            name: category,
          },
        },
      },
    });
    return {
      ...record,
      category,
    };
  }

  /**
   * Поиск записи
   * @param id Уникальный идентификатор
   */
  async findById(id: string) {
    const record = await this.prisma.task.findUnique({
      where: {
        id: parseInt(id, 10),
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    return {
      ...record,
      category: record?.category?.name,
    };
  }

  /**
   * Удаление записи
   * @param id Идентификатор записи
   */
  async delete(id: string) {
    await this.prisma.task.delete({
      where: {
        id: parseInt(id, 10),
      },
    });
  }

  /**
   * Обновление записи
   * @param id Идентификатор записи
   * @param item Полезная нагрузка
   * @returns Обновленная запись
   */
  async update(id: string, item: Task) {
    const { category, ...rest } = item;
    const record = await this.prisma.task.update({
      where: {
        id: parseInt(id, 10),
      },
      data: {
        ...rest,
      },
    });
    return {
      ...record,
      category,
    };
  }

  /**
   * Выборка всех записей по таблице tasks  с учетом фильтрации
   * @param query Фильтры, переданные в query-параметрах
   * @returns Список записей
   */
  async getRepository(query: PostQuery) {
    const { limit, city, page, category, sorting, tag } = query;
    const records = await this.prisma.task.findMany({
      where: {
        status: TaskStatus.New,
        city,
        categoryId: category,
        tags: {
          hasSome: tag,
        },
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        [sorting]: 'desc',
      },
      take: limit,
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
    return records.map((item) => ({
      ...item,
      category: item?.category?.name,
    }));
  }
}
