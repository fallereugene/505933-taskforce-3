import { ChangeCommentsCount } from '../task/dto';
import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitMqRouting } from '@project/contracts';
import { NoAuth } from '@project/utils/utils-core';
import { TaskService } from '../task/task.service';

@Controller()
export class TaskSubscriberController {
  constructor(private readonly taskService: TaskService) {} //private readonly subscriberService: EmailSubscriberService,

  @NoAuth()
  @RabbitSubscribe({
    exchange: 'taskforce.task',
    routingKey: RabbitMqRouting.ChangeCommentsCount,
    queue: 'taskforce.task',
  })
  async changeCommentsQuantity(payload: ChangeCommentsCount) {
    await this.taskService.changeCommentsQuantity(payload);
  }
}
