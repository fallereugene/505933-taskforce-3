import { Module } from '@nestjs/common';
import { PrismaModule } from '@project/services';
import { TaskModule } from './task/task.module';

@Module({
  imports: [PrismaModule.forRoot(), TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
