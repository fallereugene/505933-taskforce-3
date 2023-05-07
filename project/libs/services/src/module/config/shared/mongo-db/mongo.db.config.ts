import { registerAs } from '@nestjs/config';
import { MongoDatabaseConfig } from './contracts';
import { SharedConfigNamespace } from '../../constants';
import { Configuration } from '../../configuration';
import { MongoDatabaseModel } from './mongo-database-model';
import { getMongodbConfig } from './utils';

export const dbConfig = (options: MongoDatabaseConfig) => {
  return registerAs(
    SharedConfigNamespace.MongoDatabase,
    (): MongoDatabaseConfig => {
      const config = new Configuration(options ?? getMongodbConfig());

      return config.validate(MongoDatabaseModel);
    }
  );
};
