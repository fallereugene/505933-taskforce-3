import path from 'path';
import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule as ConfigModuleRoot } from '@nestjs/config';
import { ConfigModuleOptions } from './contracts';
import { commonConfig } from './common.config';
import { ConfigCommentNamespace } from './constants';

const envFilePath = `apps/${path.basename(__dirname)}/.env.${
  process.env.NODE_ENV
}`;

@Module({})
export class ConfigCommentModule {
  static forRoot(options?: ConfigModuleOptions): DynamicModule {
    return {
      module: ConfigCommentModule,
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

export { ConfigCommentNamespace };
