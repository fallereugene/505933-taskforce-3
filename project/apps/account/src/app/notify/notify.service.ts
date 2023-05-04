import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { rabbitConfig } from '@project/services';
import { ConfigType } from '@nestjs/config';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { RabbitMqRouting } from '@project/contracts';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig({} as any).KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDto) {
    return this.rabbitClient.publish<CreateSubscriberDto>(
      'taskforce.notify',
      RabbitMqRouting.AddSubscriber,
      { ...dto }
    );
  }
}
