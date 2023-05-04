import { registerAs } from '@nestjs/config';
import { Configuration } from '../configuration';
import { ConfigNamespace } from '../constants';
import { RabbitMqConfig } from '../contracts';
import { RabbitModel } from './rabbit.model';

export const rabbitConfig = (options: RabbitMqConfig) => {
  return registerAs(ConfigNamespace.RabbitMq, (): RabbitMqConfig => {
    const config = new Configuration(
      options ?? {
        host: process.env.RABBITMQ_HOST,
        password: process.env.RABBITMQ_DEFAULT_PASS,
        port: parseInt(process.env.RABBITMQ_PORT, 10),
        user: process.env.RABBITMQ_DEFAULT_USER,
        queue: process.env.RABBITMQ_QUEUE,
        exchange: process.env.RABBITMQ_EXCHANGE,
      }
    );

    return config.validate(RabbitModel);
  });
};
