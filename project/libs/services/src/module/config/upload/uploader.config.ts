import { registerAs } from '@nestjs/config';
import { Configuration } from '../configuration';
import { ConfigUploadNamespace } from './constants';
import { UploaderConfig } from './contracts';
import { UploaderConfigModel } from './models';
import { getUploaderConfig } from './utils';

export const uploaderConfig = (options?: UploaderConfig) => {
  return registerAs(ConfigUploadNamespace.Uploader, (): UploaderConfig => {
    const config = new Configuration(options ?? getUploaderConfig());
    return config.validate(UploaderConfigModel);
  });
};

export { UploaderConfig };
