import { IsString } from 'class-validator';
import { JwtConfig } from '../contracts';
import { EnvValidationMessage } from './constants';

export class JwtModel implements JwtConfig {
  @IsString({
    message: EnvValidationMessage.SecretRequired,
  })
  accessTokenSecret: string;
  @IsString({
    message: EnvValidationMessage.ExpiresInRequired,
  })
  accessTokenExpiresIn: string;
}
