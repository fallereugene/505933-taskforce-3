import { Account, AvailableCity, AvailableRole } from '@project/contracts';
import { compare, genSalt, hash } from 'bcrypt';

export class AccountEntity implements Account {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  city: AvailableCity;
  role: AvailableRole;
  avatar?: string;
  birthDate: string;
  registrationDate: string;
  password: string;

  constructor(account: Account) {
    this.fillEntity(account);
  }

  /**
   * Заполнение данными
   * @param account Объект пользователя
   */
  fillEntity(account: Account) {
    Object.assign(this, account);
  }

  /**
   * Генерация и установка хеша пароля
   * @param password Переданный открытый пароль
   */
  async setPassword(password: string): Promise<AccountEntity> {
    const salt = await genSalt(10);
    this.password = await hash(password.toString(), salt);
    return this;
  }

  /**
   * Сравнение переданного пароля с текущим
   * @param password Переданный открытый пароль
   */
  async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}
