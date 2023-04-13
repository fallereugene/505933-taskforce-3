import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, HydratedDocument } from 'mongoose';
import { Account } from '@project/contracts';
import { RepositoryMongo } from '@project/services';
import { AccountEntity } from '../entity';
import { AccountModel } from '../model';

@Injectable()
export class Repository extends RepositoryMongo<AccountEntity, Account> {
  constructor(
    @InjectModel(AccountModel.name)
    private readonly accountModel: Model<HydratedDocument<Account>>
  ) {
    super(accountModel);
  }

  /**
   * Поиск пользователя по электронной почте
   * @param email Электронная почта
   * @returns Объект пользователя.
   * В случае, если пользователь не найден - null.
   */
  async findByEmail(email: string): Promise<Account> {
    const record = await this.accountModel.findOne({ email }).lean();
    return record ?? null;
  }
}
