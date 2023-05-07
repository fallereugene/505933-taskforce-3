import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@project/utils/utils-core';
import { ConfigUploadModule, HttpModule } from '@project/services';
import { FileModule } from './file/file.module';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/services';

@Module({
  imports: [
    ConfigUploadModule.forRoot(),
    FileModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
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
