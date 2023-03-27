import dayjs from 'dayjs';
import { Module } from '@nestjs/common';
import { Timezone, DAYJS_REGISTER_NAME } from '@project/services';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Repository } from './service';

@Module({
  controllers: [ReviewController],
  providers: [
    ReviewService,
    Repository,
    Timezone,
    {
      provide: DAYJS_REGISTER_NAME,
      useValue: dayjs,
    },
  ],
})
export class ReviewModule {}
