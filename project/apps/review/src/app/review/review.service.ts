import {
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Review, AccessTokenPayload, AvailableRole } from '@project/contracts';
import { Repository, TaskRepository } from './service';
import { CreateReviewDto } from './dto';
import { ReviewEntity } from './entity';
import { Exception } from '../constants';

@Injectable()
export class ReviewService {
  constructor(
    private readonly repository: Repository,
    private readonly taskRepository: TaskRepository
  ) {}

  /**
   * Создание комментария
   * @param payload Объект DTO
   * @param user Данные access-токена
   * @param token Access-токен, переданный в заголовке авторизации
   * @returns Детали созданного комментария
   */
  async create(
    payload: CreateReviewDto,
    user: AccessTokenPayload,
    token: string
  ): Promise<Review> {
    const { taskId, contractor } = payload;
    const { id } = user;
    const taskRecord = await this.taskRepository.findById(taskId, token);

    if (taskRecord.customer !== id || taskRecord.contractor !== contractor) {
      throw new ForbiddenException(Exception.ForbiddenException);
    }

    const record = await this.repository.findByTask(taskId);
    if (record.customer === id) {
      throw new BadRequestException(Exception.BadRequest);
    }

    const entity = new ReviewEntity({ ...payload, customer: user.id });

    return this.repository.create(entity);
  }

  /**
   * Поиск отзывов по идентификатору пользователя в разрезе роли
   * @param id Уникальный идентификатор пользователя
   * @param role Роль
   * @returns Список отзывов
   */
  async findByAccount(id: string, role: AvailableRole) {
    return this.repository.findByAccount(id, role);
  }
}
