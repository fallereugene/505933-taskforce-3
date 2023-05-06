import path from 'path';
import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule as ConfigModuleRoot } from '@nestjs/config';
import { ConfigModuleOptions } from './contracts';
import { dbConfig } from '../shared';
import { commonConfig } from './common.config';
import { jwtConfig } from './jwt.config';
import { ConfigAccountNamespace } from './constants';
import { rabbitConfig } from '../shared';

const envFilePath = `apps/${path.basename(__dirname)}/.env.${
  process.env.NODE_ENV
}`;

@Module({})
export class ConfigAccountModule {
  static forRoot(options?: ConfigModuleOptions): DynamicModule {
    return {
      module: ConfigAccountModule,
      imports: [
        ConfigModuleRoot.forRoot({
          isGlobal: true,
          cache: true,
          load: [
            commonConfig(options),
            dbConfig(options),
            jwtConfig(options),
            rabbitConfig(options),
          ],
          envFilePath: envFilePath,
        }),
      ],
      exports: [],
    };
  }
}

export { ConfigAccountNamespace, jwtConfig };
export * from './contracts';
export * from './utils';
