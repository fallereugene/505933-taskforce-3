import { IsNumber, IsString } from 'class-validator';
import { Environment } from '../../contracts';
import { ValidationMessage } from '../constants';
import { CommonNotifyConfig } from '../contracts';

export class CommonConfigModel implements CommonNotifyConfig {
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
