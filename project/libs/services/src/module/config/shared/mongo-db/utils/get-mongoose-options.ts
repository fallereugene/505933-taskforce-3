import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { MongoDatabaseConfig } from '../contracts';
import { SharedConfigNamespace } from '../../../constants';
import { getMongoConnectionString } from './get-mongo-connection-string';

/**
 * Получение опций для асинхронной регистрации модуля
 */
export const getMongooseOptions = (): MongooseModuleAsyncOptions => {
  return {
    useFactory: async (configService: ConfigService) => {
      const { name, host, port, user, password, authBase } =
        configService.get<MongoDatabaseConfig>(
          SharedConfigNamespace.MongoDatabase
        );
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
