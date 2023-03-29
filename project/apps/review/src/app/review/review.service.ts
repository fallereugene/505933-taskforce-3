import { Injectable } from '@nestjs/common';
import { Review } from '@project/contracts';
import { Repository } from './service';
import { CreateReviewDto } from './dto';
import { ReviewEntity } from './entity';

@Injectable()
export class ReviewService {
  constructor(private readonly repository: Repository) {}

  /**
   * Создание комментария
   * @param payload Объект DTO
   * @returns Детали созданного комментария
   */
  async create(payload: CreateReviewDto): Promise<Review> {
    const entity = new ReviewEntity(payload);
    return this.repository.create(entity);
  }
}
