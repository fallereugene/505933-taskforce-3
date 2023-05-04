import path from 'path';
import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule as ConfigModuleRoot } from '@nestjs/config';
import { ConfigModuleOptions } from './contracts';
import { commonConfig } from './common.config';
import { ConfigReviewNamespace } from './constants';

const envFilePath = `apps/${path.basename(__dirname)}/.env.${
  process.env.NODE_ENV
}`;

@Module({})
export class ConfigReviewModule {
  static forRoot(options?: ConfigModuleOptions): DynamicModule {
    return {
      module: ConfigReviewModule,
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

export { ConfigReviewNamespace };
