import { ApiProperty } from '@nestjs/swagger';

export class LoginAccountDto {
  @ApiProperty({
    description: "User's unique email address",
    example: 'john.doe@yahoo.com',
  })
  email: string;
  @ApiProperty({
    description: "User's password",
    example: '123456',
  })
  @ApiProperty({
    description: 'Password',
    example: '123456',
  })
  password: string;
}
