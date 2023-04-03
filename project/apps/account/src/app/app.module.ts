import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { ConfigModuleRoot } from '@project/services';

@Module({
  imports: [AccountModule, ConfigModuleRoot],
  controllers: [],
  providers: [],
})
export class AppModule {}
