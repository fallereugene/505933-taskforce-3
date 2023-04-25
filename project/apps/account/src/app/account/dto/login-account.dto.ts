import { MinLength, MaxLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PasswordSetting } from '../../constants';

export class LoginAccountDto {
  @ApiProperty({
    description: "User's unique email address",
    example: 'john.doe@yahoo.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "User's password",
    example: '123456',
  })
  @ApiProperty({
    description: 'Password',
    example: '123456',
  })
  @MinLength(PasswordSetting.MinLength)
  @MaxLength(PasswordSetting.MaxLength)
  password: string;
}
