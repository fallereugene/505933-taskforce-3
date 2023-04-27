import { Module } from '@nestjs/common';
import { PrismaModule, ConfigModule } from '@project/services';
import { TaskModule } from './task/task.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './task/guard';
import { HttpModule } from '@project/services';

@Module({
  imports: [
    PrismaModule.forRoot(),
    TaskModule,
    ConfigModule.setModulesList(['commonConfig']).forRoot(),
    HttpModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
