import { registerAs } from '@nestjs/config';
import { Configuration } from '../configuration';
import { ConfigReviewNamespace } from './constants';
import { CommonConfig } from './contracts';
import { CommonConfigModel } from './models/common-config-model';
import { getCommonConfig } from './utils';

export const commonConfig = (options: CommonConfig) => {
  return registerAs(ConfigReviewNamespace.Common, (): CommonConfig => {
    const config = new Configuration(options ?? getCommonConfig());
    return config.validate(CommonConfigModel);
  });
};

export { CommonConfig };
