import 'multer';
import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { NoAuth } from '@project/utils/utils-core';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@project/utils/utils-core';
import { AccountService } from './account.service';
import {
  CreateAccountDto,
  LoginAccountDto,
  ChangePasswordDto,
  ChangeProfileDto,
} from './dto';
import { AccountRdo, LoggedInAccountRdo, AccessTokenRdo } from './rdo';
import { MongoIdValidationPipe } from './validators';
import { JwtAuthGuard } from './guards';
import { NotifyService } from '../notify/notify.service';

@ApiTags('account')
@Controller({
  version: '1',
  path: 'account',
})
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly notifyService: NotifyService
  ) {}

  /**
   * Регистрация нового пользователя
   * @param dto Объект DTO
   * @returns Данные созданного пользователя
   */
  @Post('/register')
  @ApiOperation({ summary: 'New account registration' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'New account has been successfully created',
    type: AccountRdo,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Account has already exists',
  })
  async register(@Body() dto: CreateAccountDto): Promise<AccountRdo> {
    const payload = await this.accountService.register(dto);
    const { email, firstname, lastname } = payload;
    await this.notifyService.registerSubscriber({ email, firstname, lastname });
    return fillObject(AccountRdo, payload);
  }

  /**
   * Авторизация пользователей построена на основе JWT.
   * После успешной проверки логина и пароля, приложение возвращает JWT токен.
   * @param dto Объект DTO
   * @returns Токен, содержащий необходимую информацию
   */
  @Post('/login')
  @ApiOperation({ summary: 'Logging process' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Account has been logged in successfully',
    type: LoggedInAccountRdo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  async login(@Body() dto: LoginAccountDto): Promise<LoggedInAccountRdo> {
    const user = await this.accountService.verifyAccount(dto);
    const { accessToken } = await this.accountService.createToken(user);
    return fillObject(LoggedInAccountRdo, { ...user, accessToken });
  }

  /**
   * Выход пользователя из авторизованной зоны
   */
  @Post('/logout')
  @ApiOperation({ summary: 'Logging out process' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Account has been logged out',
  })
  async logout(): Promise<{}> {
    return {};
  }

  /**
   * Проверка аутентификации пользователя
   * @param authorization Параметр авторизации, переданный в заголовке
   */
  @Get('/auth')
  @ApiOperation({ summary: "Check user's auth state." })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Access token information',
    type: AccessTokenRdo,
  })
  async isAuthenticated(@Headers('authorization') authorization: string) {
    const token = authorization?.split(' ')[1];
    return this.accountService.isAuthenticated(token);
  }

  /**
   * Получение детальной информации по определенному пользователю. Информация запрашивается по идентификатору пользователя.
   * @param accountId Уникальный идентификатор пользователя
   * @param authorization Значение, передаваемое в заголовке Authorization
   * @returns Возвращаемая информация зависит от роли пользователя, по которому запрашивается информация.
   */
  @UseGuards(JwtAuthGuard)
  @NoAuth()
  @Get(':accountId')
  @ApiOperation({ summary: 'Getting detailed information' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Account information',
    type: AccountRdo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  async getAccount(
    @Param('accountId', MongoIdValidationPipe) accountId: string,
    @Headers('authorization') authorization: string
  ): Promise<AccountRdo> {
    const token = authorization.split(' ')[1];
    const payload = await this.accountService.getAccountInfo(accountId, token);
    return fillObject(AccountRdo, payload);
  }

  /**
   * Изменение пользовательского пароля.
   *  Перед изменением пароля проверяется, что переданный пользователем текущий пароль соответствует тому, что сохранён в базе.
   * @param accountId Уникальный идентификатор пользователя
   * @param dto Объект DTO
   */
  @Patch(':accountId/password')
  @ApiOperation({ summary: 'Change password' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Password has been changed successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  async changePassword(
    @Param('accountId', MongoIdValidationPipe) accountId: string,
    @Body() dto: ChangePasswordDto
  ): Promise<{}> {
    await this.accountService.changePassword(dto, accountId);
    return {};
  }

  /**
   * Авторизованный пользователь может изменить информацию о себе
   * @param accountId
   * @param dto Объект DTO
   * @returns Обновленные пользовательские данные
   */
  @Patch(':accountId/profile')
  @ApiOperation({ summary: 'Change profile info' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Account information',
    type: AccountRdo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  async changeProfile(
    @Param('accountId', MongoIdValidationPipe) accountId: string,
    @Body() dto: ChangeProfileDto
  ): Promise<AccountRdo> {
    const payload = await this.accountService.changeProfile(accountId, dto);
    return fillObject(AccountRdo, payload);
  }
}
