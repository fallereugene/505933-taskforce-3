import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class PostQuery {
  static readonly DEFAULT_LIMIT = 50;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  limit = PostQuery.DEFAULT_LIMIT;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  page: number;
}
