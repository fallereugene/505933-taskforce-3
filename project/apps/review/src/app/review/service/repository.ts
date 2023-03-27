import { Injectable } from '@nestjs/common';
import { Review } from '@project/contracts';
import { ReviewEntity } from '../entity';
import { RepositoryInMemory } from '@project/services';

@Injectable()
export class Repository extends RepositoryInMemory<ReviewEntity, Review> {}
