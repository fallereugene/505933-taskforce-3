import { Injectable } from '@nestjs/common';
import { Timezone } from '@project/services';
import { Repository } from './service';

@Injectable()
export class ReviewService {
  constructor(
    private readonly repository: Repository,
    private readonly tz: Timezone
  ) {}
}
