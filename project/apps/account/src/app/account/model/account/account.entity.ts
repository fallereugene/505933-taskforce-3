import { User, AvaliableCity, AvaliableRole } from '@project/contracts';
import { compare, genSalt, hash } from 'bcrypt';

export class AccountEntity implements User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  city: AvaliableCity;
  role: AvaliableRole;
  avatar?: string;
  birthDate: string;
  registrationDate: string;
  password: string;

  constructor(account: User) {
    this.fillEntity(account);
  }

  /**
   * Заполнение данными
   * @param account Объект пользователя
   */
  fillEntity(account: User) {
    const {
      _id,
      firstname,
      lastname,
      email,
      city,
      role,
      avatar,
      birthDate,
      registrationDate,
    } = account;
    this._id = _id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.city = city;
    this.role = role;
    this.avatar = avatar;
    this.birthDate = birthDate;
    this.registrationDate = registrationDate;
  }

  /**
   * Преобразование данных в объект
   */
  toObject() {
    return { ...this };
  }

  /**
   * Генерация и установка хэша пароля
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
