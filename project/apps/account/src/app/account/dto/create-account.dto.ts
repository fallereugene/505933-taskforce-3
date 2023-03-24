import { ApiProperty } from '@nestjs/swagger';
import { AvaliableCity, AvaliableRole } from '@project/shared/contracts';

export class CreateAccountDto {
  @ApiProperty({
    description: "User's first name",
    example: 'John',
  })
  firstname: string;
  @ApiProperty({
    description: "User's last name",
    example: 'Doe',
  })
  lastname: string;
  @ApiProperty({
    description: "User's unique email address",
    example: 'john.doe@yahoo.com',
  })
  email: string;
  @ApiProperty({
    description: "User's city",
    example: 'Moscow',
  })
  city: AvaliableCity;
  @ApiProperty({
    description: "User's role",
    example: 'Customer',
  })
  role: AvaliableRole;
  @ApiProperty({
    description: 'Password',
    example: '123456',
  })
  password: string;
  @ApiProperty({
    description: "User's city",
    example: '1977-29-10',
  })
  birthDate: string;
  @ApiProperty({
    description: "User's avatar",
    example: 'avatar.png',
    required: false,
  })
  avatar?: string;
}
