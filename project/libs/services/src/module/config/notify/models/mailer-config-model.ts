import { IsNumber, IsString } from 'class-validator';
import { ValidationMessage } from '../constants';
import { MailerConfig } from '../contracts';

export class MailerConfigModel implements MailerConfig {
  @IsString({ message: ValidationMessage.MailHostIsRequired })
  host: string;

  @IsNumber({}, { message: ValidationMessage.MailPortIsRequired })
  port: number;

  @IsString({ message: ValidationMessage.MailUserNameIsRequired })
  user: string;

  @IsString({ message: ValidationMessage.MailUserPasswordIsRequired })
  password: string;

  @IsString({ message: ValidationMessage.MailFromIsRequired })
  from: string;
}
