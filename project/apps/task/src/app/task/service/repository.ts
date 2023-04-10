import { Injectable } from '@nestjs/common';
import { PrismaService } from '@project/services';

@Injectable()
export class Repository {
  constructor(private readonly prisma: PrismaService) {}
}
