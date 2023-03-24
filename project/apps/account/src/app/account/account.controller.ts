import { Controller, Body, Post, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@project/utils/utils-core';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto';
import { AccountRdo } from './rdo';

@ApiTags('account')
@Controller('account')
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
    description: 'New account has been succefully created',
    type: AccountRdo,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Account has already exists',
  })
  async register(@Body() dto: CreateAccountDto): Promise<AccountRdo> {
    const record = await this.accountService.register(dto);
    return fillObject(AccountRdo, record);
  }
}
