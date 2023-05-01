import dayjs from 'dayjs';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  Timezone,
  AvailableTimezoneService,
  getJwtOptions,
} from '@project/services';
import { JwtAuthStrategy } from './validators';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountModel, AccountSchema } from './model';
import { Repository, TaskRepository, ReviewRepository } from './service';
import { Http } from '@project/services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccountModel.name, schema: AccountSchema },
    ]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
  ],
  controllers: [AccountController],
  providers: [
    AccountService,
    Repository,
    TaskRepository,
    ReviewRepository,
    Timezone,
    {
      provide: AvailableTimezoneService.DayJs,
      useValue: dayjs,
    },
    JwtAuthStrategy,
    Http,
  ],
})
export class AccountModule {}
