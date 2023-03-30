import dayjs from 'dayjs';
import { Module } from '@nestjs/common';
import { Timezone, InjectableTimezoneService } from '@project/services';
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
      provide: InjectableTimezoneService.DayJs,
      useValue: dayjs,
    },
  ],
})
export class AccountModule {}
