import { RabbitConfig } from '../contracts';

export const getRabbitConfig = (): RabbitConfig => {
  return {
    host: process.env.RABBITMQ_HOST,
    port: parseInt(process.env.RABBITMQ_PORT, 10),
    user: process.env.RABBITMQ_DEFAULT_USER,
    password: process.env.RABBITMQ_DEFAULT_PASS,
    queue: process.env.RABBITMQ_QUEUE,
    exchange: process.env.RABBITMQ_EXCHANGE,
  };
};
