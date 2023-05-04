import * as path from 'node:path';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const getMailerAsyncOptions = (
  optionSpace: string
): MailerAsyncOptions => {
  return {
    useFactory: async (configService: ConfigService) => {
      return {
        transport: {
          host: 'localhost',
          port: 5025,
          secure: false,
          auth: {
            user: 'admin',
            pass: 'test',
          },
        },
        defaults: {
          from: configService.get<string>('noreply@notify.local'),
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
