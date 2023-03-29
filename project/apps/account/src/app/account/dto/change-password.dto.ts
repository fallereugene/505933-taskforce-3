import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Old password',
    example: '123456',
  })
  oldPassword: string;
  @ApiProperty({
    description: 'New password',
    example: '1234567',
  })
  newPassword: string;
}
