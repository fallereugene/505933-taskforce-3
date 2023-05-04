import { registerAs } from '@nestjs/config';
import { Configuration } from '../configuration';
import { ConfigNotifyNamespace } from './constants';
import { MailerConfig } from './contracts';
import { MailerConfigModel } from './models';
import { getMailerConfig } from './utils';

export const mailerConfig = (options: MailerConfig) => {
  return registerAs(ConfigNotifyNamespace.Mailer, (): MailerConfig => {
    const config = new Configuration(options ?? getMailerConfig());
    return config.validate(MailerConfigModel);
  });
};
