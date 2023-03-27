import { Injectable } from '@nestjs/common';
import { CRUDRepository, Account } from '@project/contracts';
import { AccountEntity } from '../model/account';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class Repository
  implements CRUDRepository<AccountEntity, string, Account>
{
  private repository: { [key: string]: Account } = {};

  /**
   * Сохранение сущность Пользователь
   * @param payload Объект пользователя
   * @returns Объект пользователя
   */
  async create(payload: AccountEntity): Promise<Account> {
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
  async findById(id: string): Promise<Account | null> {
    return this.repository[id] ?? null;
  }

  /**
   * Поиск пользователя по электронной почте
   * @param email Электронная почта
   * @returns Объект пользователя.
   * В случае, если пользователь не найден - null.
   */
  async findByEmail(email: string): Promise<Account> {
    const record = Object.values(this.repository).find(
      (item) => item.email === email
    );
    return record ?? null;
  }

  /**
   * Обновление данных
   * @param id Уникальный идентификатор, по которому нужно выполнить обновление
   * @param item Обнорвленные данный
   * @returns Объект пользователя
   */
  async update(id: string, item: Account): Promise<Account> {
    const record = {
      ...this.repository[id],
      ...item,
    };
    this.repository[record._id] = record;
    return record;
  }
}
