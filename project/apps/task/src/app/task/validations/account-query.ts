import { IsOptional, IsString } from 'class-validator';

export class AccountQuery {
  @IsString()
  @IsOptional()
  role: string;

  @IsString()
  @IsOptional()
  roleId: string;
}
