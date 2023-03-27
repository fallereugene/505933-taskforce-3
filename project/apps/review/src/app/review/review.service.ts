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
    return this.repository.create({ ...payload });
  }
}
