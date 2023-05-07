import { IsString } from 'class-validator';
import { JwtConfig } from '../contracts';
import { ValidationMessage } from '../constants';

export class JwtModel implements JwtConfig {
  @IsString({
    message: ValidationMessage.AccessTokenSecretRequired,
  })
  accessTokenSecret: string;
  @IsString({
    message: ValidationMessage.AccessTokenExpiresInRequired,
  })
  accessTokenExpiresIn: string;
  @IsString({
    message: ValidationMessage.RefreshTokenSecretRequired,
  })
  refreshTokenSecret: string;
  @IsString({
    message: ValidationMessage.RefreshTokenExpiresInRequired,
  })
  refreshTokenExpiresIn: string;
}
