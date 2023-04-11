import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { Timezone } from '@project/services';
import {
  CreateAccountDto,
  LoginAccountDto,
  ChangePasswordDto,
  ChangeProfileDto,
} from './dto';
import { Repository } from './service';
import { AccountEntity } from './entity';
import { EXCEPTION } from '../constants';

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
  async register(payload: CreateAccountDto) {
    const account = {
      ...payload,
      birthDate: this.tz.getDateTimeLocale(
        Timezone.UTC_FORMAT,
        payload.birthDate
      ),
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
  async verifyAccount(payload: LoginAccountDto) {
    const { email, password } = payload;
    const record = await this.repository.findByEmail(email);
    if (!record) {
      throw new NotFoundException(EXCEPTION.NotFoundAccount);
    }
    const accountEntity = new AccountEntity(record);
    if (!(await accountEntity.comparePassword(password))) {
      throw new UnauthorizedException(EXCEPTION.AuthorizationFailed);
    }
    return accountEntity;
  }

  /**
   * Поиск пользователя по идентификатору
   * @param id Идентификатор пользователя
   * @returns Объект пользователя
   */
  async findById(id: string) {
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
  async changePassword(payload: ChangePasswordDto, accountId: string) {
    const { oldPassword, newPassword } = payload;
    const record = await this.findById(accountId);
    await this.verifyAccount({
      email: record.email,
      password: oldPassword,
    });
    const entity = await new AccountEntity({ ...record.toJSON() }).setPassword(
      newPassword
    );
    console.log();
    return this.repository.update(accountId, { ...entity });
  }

  /**
   * Изменение информации профиля
   * @param accountId Идентификатор аккаунта
   * @param payload Объект DTO
   * @returns Обновленные пользовательские данные
   */
  async changeProfile(accountId: string, payload: ChangeProfileDto) {
    const record = await this.findById(accountId);
    const updatedRecord = {
      ...record.toJSON(),
      ...payload,
    };
    return this.repository.update(accountId, updatedRecord);
  }
}
