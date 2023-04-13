import { Comment } from '@project/contracts';

export class CommentEntity implements Comment {
  _id?: string;
  text: string;
  task: string;
  author: string;

  constructor(task: Comment) {
    this.fillEntity(task);
  }

  /**
   * Заполнение данными
   * @param comment Объект комментария
   */
  fillEntity(comment: Comment) {
    Object.assign(this, comment);
  }
}
