import { Review } from '@project/contracts';

export class ReviewEntity implements Review {
  text: string;
  taskId: number;
  customer: string;
  contractor: string;
  rating: number;

  constructor(review: Review) {
    this.fillEntity(review);
  }

  /**
   * Заполнение данных сущности
   * @param review Объект DTO
   */
  fillEntity(review: Review) {
    Object.assign(this, review);
  }
}
