import dayjs from 'dayjs';
import { Module } from '@nestjs/common';
import {
  Timezone,
  AvailableTimezoneService,
  HttpService,
} from '@project/services';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import {
  RepositoryMemory,
  Repository,
  CommentRepository,
  Api,
} from './service';

@Module({
  controllers: [TaskController],
  providers: [
    TaskService,
    RepositoryMemory,
    Repository,
    Timezone,
    {
      provide: AvailableTimezoneService.DayJs,
      useValue: dayjs,
    },
    CommentRepository,
    {
      provide: HttpService,
      useFactory: () => new HttpService(),
    },
    HttpService,
    Api,
  ],
})
export class TaskModule {}
