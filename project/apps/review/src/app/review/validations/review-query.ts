import { AvailableRole } from '@project/contracts';
import { IsOptional, IsString } from 'class-validator';

export class ReviewQuery {
  @IsString()
  @IsOptional()
  role: AvailableRole;
}
