import dayjs from 'dayjs';
import { Module } from '@nestjs/common';
import { Timezone, DAYJS_REGISTER_NAME } from '@project/services';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { Repository } from './service';

@Module({
  controllers: [AccountController],
  providers: [
    AccountService,
    Repository,
    Timezone,
    {
      provide: DAYJS_REGISTER_NAME,
      useValue: dayjs,
    },
  ],
})
export class AccountModule {}
