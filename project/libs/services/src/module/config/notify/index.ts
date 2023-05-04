import path from 'path';
import { Module, DynamicModule } from '@nestjs/common';
import { ConfigNotifyOptions } from './contracts';
import { ConfigModule as ConfigModuleRoot } from '@nestjs/config';
import { commonConfig } from './common.config';
import { mailerConfig } from './mailer.config';
import { rabbitConfig, dbConfig } from '../';

const envFilePath = `apps/${path.basename(__dirname)}/.env.${
  process.env.NODE_ENV
}`;

@Module({})
export class ConfigNotifyModule {
  static forRoot(options?: ConfigNotifyOptions): DynamicModule {
    return {
      module: ConfigNotifyModule,
      imports: [
        ConfigModuleRoot.forRoot({
          isGlobal: true,
          cache: true,
          load: [
            dbConfig(options),
            commonConfig(options),
            rabbitConfig(options),
            mailerConfig(options),
          ],
          envFilePath: envFilePath,
        }),
      ],
      exports: [],
    };
  }
}

export * from './contracts';
export { getMailerAsyncOptions } from './utils';
