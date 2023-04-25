import { INestApplication, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/comment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaServiceComment extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
