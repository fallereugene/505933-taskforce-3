import { IsNumber, IsString } from 'class-validator';
import { MongoDatabaseConfig } from './contracts';
import { ValidationMessage } from './constants';

export class MongoDatabaseModel implements MongoDatabaseConfig {
  @IsString({
    message: ValidationMessage.MongoNameRequired,
  })
  name: string;

  @IsString({
    message: ValidationMessage.MongoNameRequired,
  })
  host: string;

  @IsNumber(
    {},
    {
      message: ValidationMessage.MongoNameRequired,
    }
  )
  port: number;

  @IsString({
    message: ValidationMessage.MongoNameRequired,
  })
  user: string;

  @IsString({
    message: ValidationMessage.MongoNameRequired,
  })
  password: string;

  @IsString({
    message: ValidationMessage.MongoNameRequired,
  })
  authBase: string;
}
