import { TaskStatus, Role, AvailableRole } from '@project/contracts';
import { Transform } from 'class-transformer';
import { IsOptional, IsEnum, IsString } from 'class-validator';

export class AccountQuery {
  @IsEnum(Role)
  @IsOptional()
  role: AvailableRole;

  @IsString()
  @IsOptional()
  id: string;
}
