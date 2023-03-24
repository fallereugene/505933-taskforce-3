import { Injectable } from '@nestjs/common';
import { CRUDRepository, User } from '@project/contracts';
import { AccountEntity } from '../model/account';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class Repository implements CRUDRepository<AccountEntity, number, User> {
  private repository: { [key: string]: User } = {};

  /**
   * Сохранение сущность Пользователь
   * @param payload Объект пользователя
   * @returns Объект пользователя
   */
  async create(payload: AccountEntity): Promise<User> {
    const record = {
      ...payload,
      _id: uuidv4(),
    };

    this.repository[record._id] = record;

    return record;
  }

  /**
   * Поиск пользователя по идентификатору
   * @param id Идентификатор пользователя
   * @returns Объект пользователя
   * В случае, если пользователь не найден - null.
   */
  async findById(id: number): Promise<User> {
    return this.repository[id] ?? null;
  }

  /**
   * Поиск пользователя по электронной почте
   * @param email Электронная почта
   * @returns Объект пользователя.
   * В случае, если пользователь не найден - null.
   */
  async findByEmail(email: string): Promise<User> {
    const record = Object.values(this.repository).find(
      (item) => item.email === email
    );
    return record ?? null;
  }
}
