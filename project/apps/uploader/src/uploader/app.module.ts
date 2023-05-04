import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigUploadModule } from '@project/services';

@Module({
  imports: [ConfigUploadModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
