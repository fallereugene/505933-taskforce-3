import { registerAs } from '@nestjs/config';
import { ConfigNamespace } from '../constants';
import { DatabaseConfig } from './contracts';
import { DatabaseModel } from './db.model';
import { DEFAULT_PORT } from './constants';
import { Configuration } from '../configuration';

export const dbConfig = registerAs(
  ConfigNamespace.Database,
  (): DatabaseConfig => {
    const config = new Configuration({
      name: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? DEFAULT_PORT.toString(), 10),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      authBase: process.env.DB_AUTH_BASE,
    });

    return config.validate(DatabaseModel);
  }
);

export * from './utils';
