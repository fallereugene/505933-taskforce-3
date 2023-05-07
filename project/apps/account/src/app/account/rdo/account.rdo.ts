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
    description: 'Registration date',
    example: '2023-04-26T20:34:34.300Z',
  })
  @Transform(({ obj }) => obj.createdAt)
  @Expose()
  created: string;

  @ApiProperty({
    description: "User's city",
    example: 'Moscow',
  })
  @Expose()
  city: AvailableCity;

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

  @ApiProperty({
    description: "User's information",
    example: 'Extended information about account',
  })
  @Expose()
  info: string;

  @ApiProperty({
    description: "User's age",
    example: 30,
  })
  @Expose()
  age?: number;

  @ApiProperty({
    description: "Contractor's specialization",
    example: ['engineering', 'embedded'],
  })
  @Expose()
  specialization?: string;

  @ApiProperty({
    description: 'Tasks quantity published by customer',
    example: 12,
  })
  @Expose()
  publishedTasks?: number;

  @ApiProperty({
    description: 'Tasks quantity with status New published by customer',
    example: 4,
  })
  @Expose()
  newTasks?: number;

  @ApiProperty({
    description: 'Tasks quantity with status Finished.',
    example: 12,
  })
  @Expose()
  finishedTasksQuantity?: number;

  @ApiProperty({
    description: 'Tasks quantity with status Failed.',
    example: 12,
  })
  @Expose()
  failedTasksQuantity?: number;

  @ApiProperty({
    description: "Contractor's rating.",
    example: 12,
  })
  @Expose()
  rating?: 4.7;

  @ApiProperty({
    description: "Contractor's rating position.",
    example: 12,
  })
  @Expose()
  ratingPosition: 7;
}
