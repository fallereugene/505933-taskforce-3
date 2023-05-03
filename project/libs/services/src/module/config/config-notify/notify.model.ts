import { IsNumber, IsString } from 'class-validator';
import { Environment } from '@project/contracts';
import { NotifyConfig } from './contracts';
import { EnvValidationMessage } from './constants';

export class NotifyModel implements NotifyConfig {
  @IsString({
    message: EnvValidationMessage.EnvironmentRequired,
  })
  environment: Environment;

  @IsNumber(
    {},
    {
      message: EnvValidationMessage.ApplicationPort,
    }
  )
  applicationPort: number;

  @IsString({
    message: EnvValidationMessage.DBNameRequired,
  })
  name: string;

  @IsString({
    message: EnvValidationMessage.DBHostRequired,
  })
  host: string;

  @IsString({
    message: EnvValidationMessage.DBPortRequired,
  })
  dbPort: number;

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

  @IsString({
    message: EnvValidationMessage.rmqPasswordRequired,
  })
  rmqPassword: string;

  @IsString({
    message: EnvValidationMessage.rmqUserRequired,
  })
  rmqUser: string;
}
