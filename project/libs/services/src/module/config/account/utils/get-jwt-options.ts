import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigAccountNamespace } from '../constants';
import { JWT_ALGO } from '../constants';

/**
 * Получение опций для асинхронной регистрации модуля
 */
export const getJwtOptions = (
  configService: ConfigService
): JwtModuleOptions => {
  const { accessTokenSecret, accessTokenExpiresIn } = configService.get(
    ConfigAccountNamespace.Jwt
  );
  return {
    secret: accessTokenSecret,
    signOptions: {
      expiresIn: accessTokenExpiresIn,
      algorithm: JWT_ALGO,
    },
  };
};
