import { IsNumber, IsString } from 'class-validator';
import { DatabaseConfig } from '../contracts';
import { EnvValidationMessage } from './constants';

export class DatabaseModel implements DatabaseConfig {
  @IsString({
    message: EnvValidationMessage.DBNameRequired,
  })
  name: string;
  @IsString({
    message: EnvValidationMessage.DBHostRequired,
  })
  host: string;
  @IsNumber(
    {},
    {
      message: EnvValidationMessage.DBPortRequired,
    }
  )
  port: number;
  @IsString({
    message: EnvValidationMessage.DBUserRequired,
  })
  user: string;
  @IsString({
    message: EnvValidationMessage.DBPasswordRequired,
  })
  password: string;
  @IsString({
    message: EnvValidationMessage.DBBaseAuthRequired,
  })
  authBase: string;
}
