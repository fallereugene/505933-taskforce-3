import { Injectable, ConflictException } from '@nestjs/common';
import { User } from '@project/contracts';
import { CreateAccountDto } from './dto';
import { Repository } from './service';
import { AccountEntity } from './model/account';
import { EXCEPTION_CONFLICT } from '../constants';
import { Timezone } from '@project/services';

@Injectable()
export class AccountService {
  constructor(
    private readonly repository: Repository,
    private readonly tz: Timezone
  ) {}

  /**
   * Регистрация нового пользователя
   * @param payload Объект DTO
   * @returns Данные созданного пользователя
   */
  async register(payload: CreateAccountDto): Promise<User> {
    const {
      email,
      firstname,
      lastname,
      password,
      birthDate,
      city,
      role,
      avatar = '',
    } = payload;

    const account = {
      email,
      firstname,
      lastname,
      password,
      avatar,
      city,
      role,
      birthDate: this.tz.getDateTimeLocale(Timezone.UTC_FORMAT, birthDate),
      registrationDate: this.tz.getDateTimeLocale(Timezone.UTC_FORMAT),
    };

    const isUserExists = await this.repository.findByEmail(email);

    if (isUserExists) {
      throw new ConflictException(EXCEPTION_CONFLICT);
    }

    const record = await new AccountEntity(account).setPassword(password);

    return this.repository.create(record);
  }
}
