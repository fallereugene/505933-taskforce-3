import { SharedConfigNamespace } from '../../../constants';
import { ConfigService } from '@nestjs/config';
import { RabbitConfig } from '../contracts';
import { getRabbitMqConnectionString } from './';

export const getRabbitMqOptions = () => {
  return {
    useFactory: async (configService: ConfigService) => {
      const configuration = configService.get<RabbitConfig>(
        SharedConfigNamespace.RabbitMq
      );
      const { host, password, port, user, queue, exchange } = configuration;
      console.log(`rabbit options`, configuration);
      return {
        exchanges: [
          {
            name: exchange,
            type: 'direct',
          },
        ],
        uri: getRabbitMqConnectionString({
          host,
          password,
          user,
          port,
        }),
        connectionInitOptions: { wait: true },
        enableControllerDiscovery: true,
      };
    },
    inject: [ConfigService],
  };
};
