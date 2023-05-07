import { Module, DynamicModule } from '@nestjs/common';
import { PrismaService } from './service';

@Module({})
export class PrismaModule {
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: PrismaModule,
      providers: [PrismaService],
      exports: [PrismaService],
    };
  }
}
