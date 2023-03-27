import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { Account } from '@project/contracts';
import {
  CreateAccountDto,
  LoginAccountDto,
  ChangePasswordDto,
  ChangeProfileDto,
} from './dto';
import { Repository } from './service';
import { AccountEntity } from './entity';
import { EXCEPTION } from '../constants';
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
  async register(payload: CreateAccountDto): Promise<Account> {
    const account = {
      ...payload,
      birthDate: this.tz.getDateTimeLocale(
        Timezone.UTC_FORMAT,
        payload.birthDate
      ),
      registrationDate: this.tz.getDateTimeLocale(Timezone.UTC_FORMAT),
    };

    const isUserExists = await this.repository.findByEmail(account.email);

    if (isUserExists) {
      throw new ConflictException(EXCEPTION.Conflict);
    }

    const record = await new AccountEntity(account).setPassword(
      account.password
    );

    return this.repository.create(record);
  }

  /**
   * Поиск и валидация аккаунта
   * @param payload Объект DTO
   * @returns Данные пользователя
   */
  async verifyAccount(payload: LoginAccountDto): Promise<Account> {
    const { email, password } = payload;
    const record = await this.repository.findByEmail(email);
    if (!record) {
      throw new NotFoundException(EXCEPTION.NotFoundAccount);
    }
    const accountEntity = new AccountEntity(record);
    if (!(await accountEntity.comparePassword(password))) {
      throw new UnauthorizedException(EXCEPTION.AuthorizationFailed);
    }
    return accountEntity.toObject();
  }

  /**
   * Поиск пользователя по идентификатору
   * @param id Идентификатор пользователя
   * @returns Объект пользователя
   */
  async findById(id: string): Promise<Account> {
    const record = await this.repository.findById(id);
    if (!record) {
      throw new NotFoundException(EXCEPTION.NotFoundAccount);
    }
    return record;
  }

  /**
   * Изменение пользовательского пароля.
   * Перед изменением пароля проверяется, что переданный пользователем текущий пароль соответствует тому, что сохранён в базе.
   * @param payload Полезная нагрузка: новый и текущий пароли
   * @param accountId Уникальный идентификатор пользователя
   * @returns Объект пользователя
   */
  async changePassword(
    payload: ChangePasswordDto,
    accountId: string
  ): Promise<Account> {
    const { oldPassword, newPassword } = payload;
    const record = await this.findById(accountId);
    await this.verifyAccount({
      email: record.email,
      password: oldPassword,
    });
    const entity = await new AccountEntity({ ...record }).setPassword(
      newPassword
    );
    return this.repository.update(accountId, entity.toObject());
  }

  /**
   * Авторизованный пользователь может изменить информацию о себе
   * @param accountId
   * @param payload Объект DTO
   * @returns Обновленные пользовательские данные
   */
  async changeProfile(
    accountId: string,
    payload: ChangeProfileDto
  ): Promise<Account> {
    const record = await this.findById(accountId);
    return this.repository.update(accountId, { ...record, ...payload });
  }
}
