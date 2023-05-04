import { registerAs } from '@nestjs/config';
import { Configuration } from '../configuration';
import { NotifyNamespace } from './constants';
import { NotifyConfig } from './contracts';
import { NotifyModel } from './notify.model';

export const notifyConfig = (options: NotifyConfig) => {
  return registerAs(NotifyNamespace.Notify, (): NotifyConfig => {
    const config = new Configuration(
      options ?? {
        environment: process.env.NODE_ENV as NotifyConfig['environment'],
        port: parseInt(process.env.APPLICATION_PORT, 10),
        db: {
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT, 10),
          name: process.env.MONGO_INITDB_DATABASE,
          user: process.env.MONGO_INITDB_ROOT_USERNAME,
          password: process.env.MONGO_INITDB_ROOT_PASSWORD,
          authBase: process.env.DB_AUTH_BASE,
        },
        rabbit: {
          host: process.env.RABBITMQ_HOST,
          password: process.env.RABBITMQ_DEFAULT_PASS,
          port: parseInt(process.env.RABBITMQ_PORT, 10),
          user: process.env.RABBITMQ_DEFAULT_USER,
          queue: process.env.RABBITMQ_QUEUE,
          exchange: process.env.RABBITMQ_EXCHANGE,
        },
      }
    );
    return config.validate(NotifyModel);
  });
};

export { NotifyConfig };
