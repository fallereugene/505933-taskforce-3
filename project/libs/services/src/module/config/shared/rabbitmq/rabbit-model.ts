import { IsString, IsNumber } from 'class-validator';
import { ValidationMessage } from './constants';

export class RabbitModel {
  @IsString({
    message: ValidationMessage.RabbitHostRequired,
  })
  host: string;

  @IsString({
    message: ValidationMessage.RabbitPasswordRequired,
  })
  password: string;

  @IsNumber({}, { message: ValidationMessage.RabbitPortRequired })
  port: number;

  @IsString({
    message: ValidationMessage.RabbitUserRequired,
  })
  user: string;

  @IsString({
    message: ValidationMessage.RabbitQueueRequired,
  })
  queue: string;

  @IsString({
    message: ValidationMessage.RabbitExchangeRequired,
  })
  exchange: string;
}
