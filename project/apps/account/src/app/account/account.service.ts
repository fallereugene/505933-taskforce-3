import dayjs from 'dayjs';
import { Injectable, ConflictException } from '@nestjs/common';
import { User } from '@project/shared/contracts';
import { CreateAccountDto } from './dto';
import { Repository } from './service';
import { AccountEntity } from './model/account';
import { EXCEPTION_CONFLICT } from '../constants';

@Injectable()
export class AccountService {
  constructor(private readonly repository: Repository) {}

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
      birthDate: dayjs(birthDate).toDate(),
      registrationDate: dayjs().toDate(),
    };

    const isUserExists = await this.repository.findByEmail(email);

    if (isUserExists) {
      throw new ConflictException(EXCEPTION_CONFLICT);
    }

    const record = await new AccountEntity(account).setPassword(password);

    return this.repository.create(record);
  }
}
