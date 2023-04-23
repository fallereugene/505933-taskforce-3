import { registerAs } from '@nestjs/config';
import { Configuration } from '../configuration';
import { ConfigNamespace } from '../constants';
import { JwtConfig } from '../contracts';
import { JwtModel } from './jwt.model';

export const jwtConfig = (options: JwtConfig) => {
  return registerAs(ConfigNamespace.Jwt, (): JwtConfig => {
    const config = new Configuration(
      options ?? {
        accessTokenSecret: process.env.JWT_SECRET,
        accessTokenExpiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    return config.validate(JwtModel);
  });
};

export { JwtConfig };
