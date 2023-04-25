import { Module } from '@nestjs/common';
import { PrismaModule, ConfigModule } from '@project/services';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    PrismaModule.forRoot(),
    CommentModule,
    ConfigModule.setModulesList(['commonConfig']).forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
