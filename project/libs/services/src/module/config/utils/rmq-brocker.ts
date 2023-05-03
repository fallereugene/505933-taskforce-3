import { ConfigService } from '@nestjs/config';
import { getRabbitMqConnectionString } from './get-rabbitmq-connection-string';

export function getRabbitMQOptions(optionSpace) {
  return {
    useFactory: async (config: ConfigService) => ({
      exchanges: [
        {
          name: config.get<string>(`${optionSpace}.queue`),
          type: 'direct',
        },
      ],
      uri: getRabbitMqConnectionString({
        host: config.get<string>(`${optionSpace}.host`),
        password: config.get<string>(`${optionSpace}.password`),
        user: config.get<string>(`${optionSpace}.user`),
        port: config.get<string>(`${optionSpace}.port`),
      }),
      connectionInitOptions: { wait: true },
      enableControllerDiscovery: true,
    }),
    inject: [ConfigService],
  };
}
