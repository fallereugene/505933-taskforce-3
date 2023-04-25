import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PasswordSetting } from '../../constants';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Old password',
    example: '123456',
  })
  @IsString()
  @MinLength(PasswordSetting.MinLength)
  @MaxLength(PasswordSetting.MaxLength)
  oldPassword: string;

  @ApiProperty({
    description: 'New password',
    example: '1234567',
  })
  @IsString()
  @MinLength(PasswordSetting.MinLength)
  @MaxLength(PasswordSetting.MaxLength)
  newPassword: string;
}
