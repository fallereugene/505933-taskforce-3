import { Module } from '@nestjs/common';
import { TaskSubscriberController } from './task-subscriber.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMqOptions } from '@project/services';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitMqOptions()),
    TaskModule,
  ],
  controllers: [TaskSubscriberController],
  providers: [],
})
export class TaskSubscriberModule {}
