import { IsString } from 'class-validator';
import { EnvValidationMessage } from './constants';

export class RabbitModel {
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
