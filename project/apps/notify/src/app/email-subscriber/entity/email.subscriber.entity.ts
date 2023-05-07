import { Subscriber } from '@project/contracts';

export class EmailSubscriberEntity implements Subscriber {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  userId: string;

  constructor(emailSubscriber: Subscriber) {
    this.fillEntity(emailSubscriber);
  }

  /**
   * Заполнение данными
   * @param account Объект пользователя
   */
  fillEntity(account: Subscriber) {
    Object.assign(this, account);
  }
}
