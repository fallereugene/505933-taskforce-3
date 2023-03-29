import { Injectable } from '@nestjs/common';
import { Account } from '@project/contracts';
import { AccountEntity } from '../entity';

import { RepositoryInMemory } from '@project/services';

@Injectable()
export class Repository extends RepositoryInMemory<AccountEntity, Account> {
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
}
