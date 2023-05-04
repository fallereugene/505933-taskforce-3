import { registerAs } from '@nestjs/config';
import { Configuration } from '../configuration';
import { ConfigNotifyNamespace } from './constants';
import { CommonNotifyConfig } from './contracts';
import { CommonConfigModel } from './models/common-config-model';
import { getCommonConfig } from './utils';

export const commonConfig = (options: CommonNotifyConfig) => {
  return registerAs(ConfigNotifyNamespace.Common, (): CommonNotifyConfig => {
    const config = new Configuration(options ?? getCommonConfig());
    return config.validate(CommonConfigModel);
  });
};
