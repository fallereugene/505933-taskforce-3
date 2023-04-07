import path from 'path';
import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule as ConfigModuleRoot } from '@nestjs/config';
import { ConfigModuleOptions } from './contracts';
import { dbConfig } from './db';
import { commonConfig } from './common';

const envFilePath = `apps/${path.basename(__dirname)}/.env.${
  process.env.NODE_ENV
}`;

@Module({})
export class ConfigModule {
  static forRoot(options?: ConfigModuleOptions): DynamicModule {
    const dbConfigRegister = dbConfig(options);
    const commonConfigRegister = commonConfig(options);
    return {
      module: ConfigModule,
      imports: [
        ConfigModuleRoot.forRoot({
          isGlobal: true,
          cache: true,
          load: [dbConfigRegister, commonConfigRegister],
          envFilePath: envFilePath,
        }),
      ],
      exports: [],
    };
  }
}

export * from './constants';
export * from './db';
export * from './common';
