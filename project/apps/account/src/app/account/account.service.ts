import * as crypto from 'node:crypto';
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Timezone, jwtConfig, JwtConfig } from '@project/services';
import {
  CreateAccountDto,
  LoginAccountDto,
  ChangePasswordDto,
  ChangeProfileDto,
} from './dto';
import {
  AccessTokenPayload,
  Account,
  RefreshTokenPayload,
  TaskStatus,
} from '@project/contracts';
import { Repository, TaskRepository, ReviewRepository } from './service';
import { AccountEntity } from './entity';
import { Exception } from '../constants';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';

@Injectable()
export class AccountService {
  constructor(
    @Inject(jwtConfig().KEY) private readonly jwtOptions: JwtConfig,
    private readonly repository: Repository,
    private readonly tz: Timezone,
    private readonly jwtService: JwtService,
    private readonly taskRepository: TaskRepository,
    private readonly reviewRepository: ReviewRepository,
    private readonly refreshTokenService: RefreshTokenService
  ) {}

  /**
   * Регистрация нового пользователя
   * @param payload Объект DTO
   * @returns Данные созданного пользователя
   */
  async register(payload: CreateAccountDto) {
    const account: Account = {
      avatar: '',
      info: '',
      specialization: [],
      ...payload,
      birthDate: this.tz.getDateTimeLocale(
        Timezone.UTC_FORMAT,
        payload.birthDate
      ),
    };

    const isUserExists = await this.repository.findByEmail(account.email);

    if (isUserExists) {
      throw new ConflictException(Exception.Conflict);
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
      throw new NotFoundException(Exception.NotFoundAccount);
    }
    const accountEntity = new AccountEntity(record);
    if (!(await accountEntity.comparePassword(password))) {
      throw new UnauthorizedException(Exception.AuthorizationFailed);
    }
    return accountEntity;
  }

  /**
   * Поиск пользователя по идентификатору
   * @param id Идентификатор пользователя
   * @returns Объект пользователя
   */
  async findById(id: string): Promise<Account> {
    const record = await this.repository.findById(id);
    if (!record) {
      throw new NotFoundException(Exception.NotFoundAccount);
    }
    const { birthDate, specialization, ...rest } = record.toJSON();
    if (record.role === 'customer') {
      return rest;
    }
    return {
      ...rest,
      specialization,
      age: this.tz.getDiffFromNow(birthDate, 'year'),
    };
  }

  /**
   * Получение полной информации по аккаунту, включая информацию,
   * получаемую из других микросервисов
   * @param id Идентификатор роли
   * @param token Токен, передаваемы в заголовке Authorization
   */
  async getAccountInfo(id: string, token: string): Promise<Account> {
    const { role } = this.jwtService.decode(token) as AccessTokenPayload;
    const account = await this.findById(id);
    const rawTaskRecords = await this.taskRepository.getListByAccount(token);
    const ratingRecords = await this.reviewRepository.getRatingList(token);
    const ratingPosition = ratingRecords.findIndex(
      (item) => item.contractor === id
    );
    const totalRating = ratingRecords.find(
      (item) => item.contractor === id
    )?.totalRating;

    return {
      ...account,
      ...(role === 'customer'
        ? {
            publishedTasks: rawTaskRecords.length,
            newTasks: rawTaskRecords.filter(
              (item) => item.status === TaskStatus.New
            ).length,
          }
        : {
            finishedTasksQuantity: rawTaskRecords.filter(
              ({ status }) => status === TaskStatus.Done
            ).length,
            failedTasksQuantity: rawTaskRecords.filter(
              ({ status }) => status === TaskStatus.Failed
            ).length,
            rating: totalRating ? parseInt(totalRating, 10) : 0,
            ratingPosition:
              ratingPosition !== -1
                ? ratingPosition + 1
                : ratingRecords.length + 1,
          }),
    };
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
    const entity = await new AccountEntity({ ...record }).setPassword(
      newPassword
    );
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
    const { firstname, lastname, birthDate, info, specialization } = payload;
    const updatedRecord = {
      ...record,
      firstname,
      lastname,
      birthDate,
      info,
      specialization: [...new Set(specialization)].slice(0, 5),
    };
    return this.repository.update(accountId, updatedRecord);
  }

  /**
   * Создание JWT-токена
   * @param user Пользовательские данные, на основе которых создается токен
   */
  async createToken(tokenPayload: AccessTokenPayload) {
    const { id, email, role, lastname, firstname } = tokenPayload;
    const payload: AccessTokenPayload = {
      id,
      email,
      role,
      lastname,
      firstname,
    };
    const refreshTokenPayload = { ...payload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn,
      }),
    };
  }

  /**
   * Обновление refresh-токена
   * @param token Токен
   */
  async refreshToken(token: string) {
    const decode = this.jwtService.decode(token) as RefreshTokenPayload;
    return this.createToken(decode);
  }

  /**
   * Проверка аутентификации пользователя
   * @param token Токен
   */
  async isAuthenticated(token: string) {
    return this.jwtService.verify(token);
  }
}
