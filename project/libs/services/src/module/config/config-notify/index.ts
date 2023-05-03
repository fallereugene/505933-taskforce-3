import path from 'path';
import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule as ConfigModuleRoot } from '@nestjs/config';
import { notifyConfig } from './notify.config';
import { NotifyConfig } from './contracts';

const envFilePath = `apps/${path.basename(__dirname)}/.env.${
  process.env.NODE_ENV
}`;

@Module({})
export class ConfigNotifyModule {
  static forRoot(options?: NotifyConfig): DynamicModule {
    return {
      module: ConfigNotifyModule,
      imports: [
        ConfigModuleRoot.forRoot({
          isGlobal: true,
          cache: true,
          load: [notifyConfig(options)],
          envFilePath,
        }),
      ],
      exports: [],
    };
  }
}
