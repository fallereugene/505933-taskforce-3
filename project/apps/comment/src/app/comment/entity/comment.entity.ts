import { Comment } from '@project/contracts';

export class CommentEntity implements Comment {
  _id?: string;
  text: string;
  task: string;
  author: string;
  registrationDate: string;

  constructor(task: Comment) {
    this.fillEntity(task);
  }

  /**
   * Заполнение данными
   * @param comment Объект комментария
   */
  fillEntity(comment: Comment) {
    const { _id, text, task, author, registrationDate } = comment;

    this._id = _id;
    this.text = text;
    this.task = task;
    this.author = author;
    this.registrationDate = registrationDate;
  }

  /**
   * Преобразование данных в объект
   */
  toObject() {
    return { ...this };
  }
}
