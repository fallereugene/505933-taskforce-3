import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../../contracts';
import { ConfigNamespace } from '../../constants';
import { getMongoConnectionString } from './get-mongo-connection-string';

/**
 * Получение опций для асинхронной регистрации модуля
 */
export const getMongooseOptions = (): MongooseModuleAsyncOptions => {
  return {
    useFactory: async (configService: ConfigService) => {
      const { name, host, port, user, password, authBase } =
        configService.get<DatabaseConfig>(ConfigNamespace.Database);
      return {
        uri: getMongoConnectionString({
          name,
          host,
          port,
          user,
          password,
          authBase,
        }),
      };
    },
    inject: [ConfigService],
  };
};
