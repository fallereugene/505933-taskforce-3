import { ConfigNamespace } from '../constants';
import { ConfigService } from '@nestjs/config';
import { getRabbitMqConnectionString } from './get-rabbitmq-connection-string';

export const getRabbitMQOptions = () => {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        exchanges: [
          {
            name: 'taskforce.notify',
            type: 'direct',
          },
        ],
        uri: getRabbitMqConnectionString({
          host: 'localhost',
          password: '6e69d78258612e14e9af6db6cae9a477',
          user: 'admin',
          port: 5672,
        }),
        connectionInitOptions: { wait: true },
        enableControllerDiscovery: true,
      };
    },
    inject: [ConfigService],
  };
};
