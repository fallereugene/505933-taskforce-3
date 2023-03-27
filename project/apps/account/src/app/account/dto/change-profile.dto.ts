import { ApiProperty } from '@nestjs/swagger';

export class ChangeProfileDto {
  @ApiProperty({
    description: "User's first name",
    example: 'John',
  })
  firstname?: string;
  @ApiProperty({
    description: "User's last name",
    example: 'Doe',
  })
  lastname?: string;
  @ApiProperty({
    description: "User's city",
    example: '1977-29-10',
  })
  birthDate?: string;
  @ApiProperty({
    description: 'Extended profile information',
    example: 'Some text',
  })
  info?: string;
  @ApiProperty({
    description: 'User skills list',
    example: ['frontend', 'backend'],
  })
  specialization?: string[];
}
