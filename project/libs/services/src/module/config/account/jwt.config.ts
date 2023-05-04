import { registerAs } from '@nestjs/config';
import { Configuration } from '../configuration';
import { ConfigAccountNamespace } from './constants';
import { JwtConfig } from './contracts';
import { JwtModel } from './models';
import { getJwtConfig } from './utils';

export const jwtConfig = (options: JwtConfig) => {
  return registerAs(ConfigAccountNamespace.Jwt, (): JwtConfig => {
    const config = new Configuration(options ?? getJwtConfig());
    return config.validate(JwtModel);
  });
};
