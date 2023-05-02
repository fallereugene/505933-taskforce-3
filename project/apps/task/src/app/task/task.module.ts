import dayjs from 'dayjs';
import { Module } from '@nestjs/common';
import { Timezone, AvailableTimezoneService } from '@project/services';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { RepositoryMemory, Repository, CommentRepository } from './service';
import { HttpService } from '@project/services';

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

    HttpService,
  ],
})
export class TaskModule {}
