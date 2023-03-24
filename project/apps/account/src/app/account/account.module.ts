import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { Repository } from './service';

@Module({
  controllers: [AccountController],
  providers: [AccountService, Repository],
})
export class AccountModule {}
