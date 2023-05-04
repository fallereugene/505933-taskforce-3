export enum ValidationMessage {
  RabbitUserRequired = 'RABBITMQ_DEFAULT_USER is required',
  RabbitPasswordRequired = 'RABBITMQ_DEFAULT_PASS is required',
  RabbitPortRequired = 'RABBITMQ_PORT is required',
  RabbitQueueRequired = 'RABBITMQ_QUEUE is required',
  RabbitExchangeRequired = 'RABBITMQ_EXCHANGE is required',
  RabbitHostRequired = 'RABBITMQ_HOST is required',
}
