import { ApiProperty } from '@nestjs/swagger';
import { AvailableCity } from '@project/contracts';

export class CreateTaskDto {
  @ApiProperty({
    description: "Task's title",
    example: 'Todo title',
  })
  title: string;
  @ApiProperty({
    description: 'Extended description',
    example: 'Details about task',
  })
  description: string;
  @ApiProperty({
    description: 'One of existing category',
    example: 'Engineering',
  })
  category: string;
  @ApiProperty({
    description: 'Service cost',
    example: 1000,
  })
  @ApiProperty({
    description: "User's city",
    example: 'Moscow',
  })
  city: AvailableCity;
  cost?: number;
  @ApiProperty({
    description: 'Date of completion task',
    example: '2023-23-04T08:55:00.000Z',
  })
  dueDate?: string;
  @ApiProperty({
    description: 'Picture',
    example: 'example.png',
  })
  image?: string;
  @ApiProperty({
    description: 'The address where the task should be performed',
    example: 'Moscow, Presnenskaya embankment, 12, office No. 2',
  })
  address?: string;
  @ApiProperty({
    description: 'Tags for the task',
    example: ['engineering', 'moscow'],
  })
  tags?: string[];
}
