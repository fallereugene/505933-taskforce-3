import { ApiProperty } from '@nestjs/swagger';
import { AvailableCity, TaskStatus } from '@project/contracts';
import { Expose, Transform } from 'class-transformer';

export class TaskRdo {
  @ApiProperty({
    description: 'Unique identifier',
    example: '4ff6e921-36c4-4f80-ae41-919c06c0c5c3',
  })
  @Expose()
  id?: string;
  @ApiProperty({
    description: "Task's title",
    example: 'Todo title',
  })
  @Expose()
  title: string;
  @ApiProperty({
    description: 'Extended description',
    example: 'Details about task',
  })
  @Expose()
  description: string;
  @ApiProperty({
    description: 'One of existing category',
    example: 'Engineering',
  })
  @Expose()
  category: string;
  @ApiProperty({
    description: 'Service cost',
    example: 1000,
  })
  @Expose()
  cost: number;
  @ApiProperty({
    description: 'Date of completion task',
    example: '2023-23-04T08:55:00.000Z',
  })
  @Expose()
  dueDate: string;
  @ApiProperty({
    description: 'Picture',
    example: 'example.png',
  })
  @Expose()
  image: string;
  @ApiProperty({
    description: 'The address where the task should be performed',
    example: 'Moscow, Presnenskaya embankment, 12, office No. 2',
  })
  @Expose()
  address: string;
  @ApiProperty({
    description: 'Tags for the task',
    example: ['engineering', 'moscow'],
  })
  @Expose()
  tags: string[];
  @ApiProperty({
    description: "User's city",
    example: 'Moscow',
  })
  @Expose()
  city: AvailableCity;
  @ApiProperty({
    description: "Current task's status",
    example: 0,
  })
  @Expose()
  status: TaskStatus;
  @ApiProperty({
    description: 'Customer id',
    example: '5cc6e921-36c4-4f80-ae41-919c06c0c5c3',
  })
  @Expose()
  customer: string;
  @ApiProperty({
    description: 'Contructor id',
    example: '7bc6e921-36c4-4f80-ae41-919c06c0c5c3',
  })
  @Expose()
  contractor: string;
}
