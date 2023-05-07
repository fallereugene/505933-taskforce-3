import { MongoDatabaseConfig } from '../contracts';

export const getMongodbConfig = (): MongoDatabaseConfig => {
  return {
    name: process.env.MONGO_INITDB_DATABASE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    user: process.env.MONGO_INITDB_ROOT_USERNAME,
    password: process.env.MONGO_INITDB_ROOT_PASSWORD,
    authBase: process.env.DB_AUTH_BASE,
  };
};
