import dayjs from 'dayjs';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Timezone, InjectableTimezoneService } from '@project/services';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountModel, AccountSchema } from './model';
import { Repository } from './service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccountModel.name, schema: AccountSchema },
    ]),
  ],
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
