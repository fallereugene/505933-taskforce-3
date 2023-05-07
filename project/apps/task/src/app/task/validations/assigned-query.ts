import { TaskStatus } from '@project/contracts';
import { Transform } from 'class-transformer';
import { IsOptional, IsNumber, IsEnum } from 'class-validator';

export class AssignedQuery {
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;
}
