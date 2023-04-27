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
  UploadedFile,
  UseInterceptors,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { Express } from 'express';
import { FileSizeValidationPipe } from '@project/utils/utils-core';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject, JwtAuthGuard } from '@project/utils/utils-core';
import { AccountService } from './account.service';
import {
  CreateAccountDto,
  LoginAccountDto,
  ChangePasswordDto,
  ChangeProfileDto,
} from './dto';
import { AccountRdo, LoggedInAccountRdo } from './rdo';
import { MongoIdValidationPipe } from './validators';

@ApiTags('account')
@Controller({
  version: '1',
  path: 'account',
})
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

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
   * Получение детальной информации по определенному пользователю. Информация запрашивается по идентификатору пользователя.
   * @param accountId Уникальный идентификатор пользователя
   * @returns Возвращаемая информация зависит от роли пользователя, по которому запрашивается информация.
   */
  @UseGuards(JwtAuthGuard)
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
    @Param('accountId', MongoIdValidationPipe) accountId: string
  ): Promise<AccountRdo> {
    const payload = await this.accountService.findById(accountId);
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

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new FileSizeValidationPipe({ maxSize: 500 }))
  async upload(
    @UploadedFile()
    file: Express.Multer.File
  ) {
    //  TODO: Need to implement
  }
}
