import * as path from 'node:path';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerConfig } from '../contracts';
import { ConfigNotifyNamespace } from '../constants';

export const getMailerAsyncOptions = (): MailerAsyncOptions => {
  return {
    useFactory: async (configService: ConfigService) => {
      const { host, port, user, password, from } =
        configService.get<MailerConfig>(ConfigNotifyNamespace.Mailer);
      return {
        transport: {
          host,
          port,
          secure: false,
          auth: {
            user,
            pass: password,
          },
        },
        defaults: {
          from,
        },
        template: {
          dir: path.resolve(__dirname, 'assets'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      };
    },
    inject: [ConfigService],
  };
};
