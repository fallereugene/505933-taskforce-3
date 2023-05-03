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
        applicationPort: parseInt(process.env.APPLICATION_PORT, 10),
        name: process.env.MONGO_INITDB_DATABASE,
        host: process.env.DB_HOST,
        dbPort: parseInt(process.env.DB_PORT, 10),
        user: process.env.MONGO_INITDB_ROOT_USERNAME,
        password: process.env.MONGO_INITDB_ROOT_PASSWORD,
        authBase: process.env.DB_AUTH_BASE,
        rmqPassword: process.env.RABBITMQ_DEFAULT_PASS,
        rmqUser: process.env.RABBITMQ_DEFAULT_USER,
      }
    );

    return config.validate(NotifyModel);
  });
};

export { NotifyConfig };
