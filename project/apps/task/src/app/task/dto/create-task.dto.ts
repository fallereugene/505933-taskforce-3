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
    default: 0,
  })
  cost?: number;
  @ApiProperty({
    description: 'Date of completion task',
    example: '2023-04-10T00:00:00.000Z',
  })
  dueDate?: Date;
  @ApiProperty({
    description: 'Picture',
    example: 'example.png',
    default: '',
  })
  image?: string;
  @ApiProperty({
    description: 'The address where the task should be performed',
    example: 'Moscow, Presnenskaya embankment, 12, office No. 2',
    default: '',
  })
  address?: string;
  @ApiProperty({
    description: 'Tags for the task',
    example: ['engineering', 'moscow'],
  })
  tags?: string[];
  @ApiProperty({
    description: "User's city",
    example: 'Moscow',
  })
  city: AvailableCity;
}
