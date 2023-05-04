import path from 'path';
import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule as ConfigModuleRoot } from '@nestjs/config';
import { ConfigModuleOptions } from './contracts';
import { commonConfig } from './common.config';
import { ConfigTaskNamespace } from './constants';

const envFilePath = `apps/${path.basename(__dirname)}/.env.${
  process.env.NODE_ENV
}`;

@Module({})
export class ConfigTaskModule {
  static forRoot(options?: ConfigModuleOptions): DynamicModule {
    return {
      module: ConfigTaskModule,
      imports: [
        ConfigModuleRoot.forRoot({
          isGlobal: true,
          cache: true,
          load: [commonConfig(options)],
          envFilePath: envFilePath,
        }),
      ],
      exports: [],
    };
  }
}

export { ConfigTaskNamespace };
