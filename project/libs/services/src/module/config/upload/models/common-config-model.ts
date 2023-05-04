import { IsNumber, IsString } from 'class-validator';
import { Environment } from '../../contracts';
import { ValidationMessage } from '../constants';
import { CommonConfig } from '../contracts';

export class CommonConfigModel implements CommonConfig {
  @IsString({
    message: ValidationMessage.EnvironmentRequired,
  })
  environment: Environment;

  @IsNumber(
    {},
    {
      message: ValidationMessage.ApplicationPort,
    }
  )
  port: number;
}
