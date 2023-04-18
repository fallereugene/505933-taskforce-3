import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { AvailableCity, AvailableRole } from '@project/contracts';

export class AccountRdo {
  @ApiProperty({
    description: 'Unique user id',
    example: '4ff6e921-36c4-4f80-ae41-919c06c0c5c3',
  })
  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id.toString())
  id: string;

  @ApiProperty({
    description: "User's last name",
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
    description: "User's city",
    example: 'Moscow',
  })
  @Expose()
  city: AvailableCity;

  @ApiProperty({
    description: "User's role",
    example: 'Customer',
  })
  @Expose()
  role: AvailableRole;

  @ApiProperty({
    description: "User's city",
    example: '1977-29-10',
  })
  @Expose()
  birthDate: string;

  @ApiProperty({
    description: "User's avatar",
    example: 'avatar.png',
  })
  @Expose()
  avatar?: string;

  @ApiProperty({
    description: "Contractor's specialization",
    example: ['engineering', 'embedded'],
  })
  @Expose()
  specialization?: string;
}
