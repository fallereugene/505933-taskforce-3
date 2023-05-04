import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Environment } from '@project/contracts';
import { NotifyConfig } from './contracts';
import { EnvValidationMessage } from './constants';

export class Rabbit {
  @IsString({
    message: EnvValidationMessage.rmqHostRequired,
  })
  host: string;

  @IsString({
    message: EnvValidationMessage.rmqPasswordRequired,
  })
  password: string;

  @IsString({
    message: EnvValidationMessage.rmqPortRequired,
  })
  port: number;

  @IsString({
    message: EnvValidationMessage.rmqUserRequired,
  })
  user: string;

  @IsString({
    message: EnvValidationMessage.rmqQueueRequired,
  })
  queue: string;

  @IsString({
    message: EnvValidationMessage.rmqExchangeRequired,
  })
  exchange: string;
}

export class Database {
  @IsString({
    message: EnvValidationMessage.DBHostRequired,
  })
  host: string;

  @IsString({
    message: EnvValidationMessage.DBPortRequired,
  })
  port: number;

  @IsString({
    message: EnvValidationMessage.DBNameRequired,
  })
  name: string;

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
  port: number;

  @ValidateNested()
  rabbit: Rabbit;

  @ValidateNested()
  db: Database;
}
