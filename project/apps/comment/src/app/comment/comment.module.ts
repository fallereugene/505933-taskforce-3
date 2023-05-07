import dayjs from 'dayjs';
import { Module } from '@nestjs/common';
import { Timezone, AvailableTimezoneService } from '@project/services';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { RepositoryMemory, Repository } from './service';
import { NotifyModule } from '../notify/notify.module';

@Module({
  imports: [NotifyModule],
  controllers: [CommentController],
  providers: [
    CommentService,
    RepositoryMemory,
    Repository,
    Timezone,
    {
      provide: AvailableTimezoneService.DayJs,
      useValue: dayjs,
    },
  ],
})
export class CommentModule {}
