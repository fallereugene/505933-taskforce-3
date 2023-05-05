import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { RabbitMqRouting } from '@project/contracts';

type ChangeCommentCount = {
  taskId: number;
  commentsQuantity: number;
};

@Injectable()
export class NotifyService {
  constructor(private readonly rabbitClient: AmqpConnection) {}

  async changeCommentCount(dto: ChangeCommentCount) {
    const { taskId, commentsQuantity } = dto;
    return this.rabbitClient.publish(
      'taskforce.task',
      RabbitMqRouting.ChangeCommentsCount,
      {
        taskId,
        commentsQuantity,
      }
    );
  }
}
