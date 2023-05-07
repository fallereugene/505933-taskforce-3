import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedInAccountRdo {
  @ApiProperty({
    description: "User's email address",
    example: 'john.doe@yahoo.com',
  })
  @Expose()
  email: string;

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
    description: 'JWT token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.PcmVIPbcZl9j7qFzXRAeSyhtuBnHQNMuLHsaG5l804A',
  })
  @Expose()
  accessToken: string;

  @ApiProperty({
    description: 'JWT refresh token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.PcmVIPbcZl9j7qFzXRAeSyhtuBnHQNMuLHsaG5l804A',
  })
  @Expose()
  refreshToken: string;
}
