import { registerAs } from '@nestjs/config';
import { Configuration } from '../configuration';
import { ConfigNamespace } from '../constants';
import { CommonConfig } from '../contracts';
import { DEFAULT_PORT } from './constants';
import { CommonModel } from './common.model';

export const commonConfig = (options: CommonConfig) => {
  return registerAs(ConfigNamespace.Common, (): CommonConfig => {
    const config = new Configuration(
      options ?? {
        environment: process.env.NODE_ENV as CommonConfig['environment'],
        port: parseInt(
          process.env.APPLICATION_PORT ?? DEFAULT_PORT.toString(),
          10
        ),
        urlServiceAccount: process.env.URL_SERVICE_ACCOUNT,
      }
    );

    return config.validate(CommonModel);
  });
};

export { CommonConfig };
