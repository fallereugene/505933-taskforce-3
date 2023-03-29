import { Review } from '@project/contracts';

export class ReviewEntity implements Review {
  _id?: string;
  text: string;
  task: string;
  rating: number;

  constructor(review: Review) {
    this.fillEntity(review);
  }

  /**
   * Заполнение данных сущности
   * @param review Объект DTO
   */
  fillEntity(review: Review) {
    const { _id, text, task, rating } = review;

    this._id = _id;
    this.text = text;
    this.task = task;
    this.rating = rating;
  }

  /**
   * Преобразование данных в объект
   */
  toObject() {
    return { ...this };
  }
}
