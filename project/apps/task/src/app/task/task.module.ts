import dayjs from 'dayjs';
import { Module } from '@nestjs/common';
import { Timezone, DAYJS_REGISTER_NAME } from '@project/services';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Repository } from './service';

@Module({
  controllers: [TaskController],
  providers: [
    TaskService,
    Repository,
    Timezone,
    {
      provide: DAYJS_REGISTER_NAME,
      useValue: dayjs,
    },
  ],
})
export class TaskModule {}
