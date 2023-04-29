import { Module } from '@nestjs/common';
import { ConfigModule } from '@project/services';
import { CommentModule } from './comment/comment.module';
import { PrismaModule } from './comment/prisma.module';

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
