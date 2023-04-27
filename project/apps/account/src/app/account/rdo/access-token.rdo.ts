import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { AvailableRole } from '@project/contracts';

export class AccessTokenRdo {
  @ApiProperty({
    description: 'Unique user id',
    example: '4ff6e921-36c4-4f80-ae41-919c06c0c5c3',
  })
  id: string;

  @ApiProperty({
    description: "User's first name",
    example: 'John',
  })
  @Expose()
  firstname: string;

  @ApiProperty({
    description: "User's last name",
    example: 'Doe',
  })
  @Expose()
  lastname: string;

  @ApiProperty({
    description: "User's unique email address",
    example: 'john.doe@yahoo.com',
  })
  @Expose()
  email: string;

  @ApiProperty({
    description: "User's role",
    example: 'Customer',
  })
  @Expose()
  role: AvailableRole;
}
