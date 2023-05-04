import { IsString } from 'class-validator';
import { JwtConfig } from '../contracts';
import { ValidationMessage } from '../constants';

export class JwtModel implements JwtConfig {
  @IsString({
    message: ValidationMessage.SecretRequired,
  })
  accessTokenSecret: string;
  @IsString({
    message: ValidationMessage.ExpiresInRequired,
  })
  accessTokenExpiresIn: string;
}
