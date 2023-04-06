import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { ConfigModuleRoot } from '@project/services';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/services';

@Module({
  imports: [
    AccountModule,
    ConfigModuleRoot,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
