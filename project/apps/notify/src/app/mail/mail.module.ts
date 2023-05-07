import { Module } from '@nestjs/common';
import { getMailerAsyncOptions } from '@project/services';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';

@Module({
  imports: [MailerModule.forRootAsync(getMailerAsyncOptions())],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
