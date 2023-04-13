import { registerAs } from '@nestjs/config';
import { ConfigNamespace } from '../constants';
import { DatabaseConfig } from '../contracts';
import { DatabaseModel } from './db.model';
import { DEFAULT_PORT } from './constants';
import { Configuration } from '../configuration';

export const dbConfig = (options: DatabaseConfig) => {
  return registerAs(ConfigNamespace.Database, (): DatabaseConfig => {
    const config = new Configuration(
      options ?? {
        name: process.env.MONGO_INITDB_DATABASE,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT ?? DEFAULT_PORT.toString(), 10),
        user: process.env.MONGO_INITDB_ROOT_USERNAME,
        password: process.env.MONGO_INITDB_ROOT_PASSWORD,
        authBase: process.env.DB_AUTH_BASE,
      }
    );

    return config.validate(DatabaseModel);
  });
};

export * from './utils';
