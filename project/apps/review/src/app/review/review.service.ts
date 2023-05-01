import {
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Review, AccessTokenPayload } from '@project/contracts';
import { Repository, TaskRepository } from './service';
import { CreateReviewDto } from './dto';
import { ReviewEntity } from './entity';
import { Exception } from '../constants';
import { calculateRating } from './utils';

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
    const taskRecord = await this.taskRepository.findById(taskId);

    if (taskRecord.customer !== id || taskRecord.contractor !== contractor) {
      throw new ForbiddenException(Exception.ForbiddenException);
    }

    const record = await this.repository.findByTask(taskId);

    if (record && record.customer === id) {
      throw new BadRequestException(Exception.BadRequest);
    }

    const ratingId = await this.repository.getRatingByContractor(contractor);

    const entity = new ReviewEntity({
      ...payload,
      customer: user.id,
      contractor: contractor,
    });

    const reviewRecord = await this.repository.create(entity, ratingId?.id);

    const taskListByContractor = await this.taskRepository.findByContractor(
      contractor,
      token
    );
    const reviewList = await this.repository.findByContractor(
      reviewRecord.contractorId
    );

    await this.repository.updateRating(
      reviewRecord.contractorId,
      calculateRating(reviewList, taskListByContractor)
    );

    return reviewRecord;
  }

  async getRatingList() {
    return this.repository.getRatingList();
  }
}
