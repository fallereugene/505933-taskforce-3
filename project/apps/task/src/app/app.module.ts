import { Module } from '@nestjs/common';
import { PrismaModule, ConfigModule } from '@project/services';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    PrismaModule.forRoot(),
    TaskModule,
    ConfigModule.setModulesList(['commonConfig']).forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
