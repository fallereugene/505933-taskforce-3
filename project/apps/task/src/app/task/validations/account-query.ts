import { Role, AvailableRole } from '@project/contracts';
import { IsOptional, IsEnum, IsString } from 'class-validator';

export class AccountQuery {
  @IsEnum(Role)
  @IsOptional()
  role: AvailableRole;

  @IsString()
  @IsOptional()
  id: string;
}
