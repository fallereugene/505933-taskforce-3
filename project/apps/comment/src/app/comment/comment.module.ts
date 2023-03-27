import dayjs from 'dayjs';
import { Module } from '@nestjs/common';
import { Timezone, DAYJS_REGISTER_NAME } from '@project/services';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Repository } from './service';

@Module({
  controllers: [CommentController],
  providers: [
    CommentService,
    Repository,
    Timezone,
    {
      provide: DAYJS_REGISTER_NAME,
      useValue: dayjs,
    },
  ],
})
export class CommentModule {}
