import { IsNumber, IsOptional, IsEnum, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { TaskStatus, AvailableCity, City } from '@project/contracts';

export enum Sorting {
  CreatedAt = 'createdAt',
  Popular = 'popular',
  Discussing = 'discussing',
}

export class TaskQuery {
  static readonly DEFAULT_LIMIT = 25;

  static readonly DEFAULT_STATUS = TaskStatus.New;

  static readonly DEFAULT_SORT: Sorting = Sorting.CreatedAt;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  limit = TaskQuery.DEFAULT_LIMIT;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  page: number;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  category: number;

  @IsString()
  @IsOptional()
  tag: string;

  @IsEnum(City)
  @IsOptional()
  city: AvailableCity;

  @IsEnum(Sorting)
  @IsOptional()
  sorting: Sorting = TaskQuery.DEFAULT_SORT;
}
