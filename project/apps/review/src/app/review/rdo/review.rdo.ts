import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class ReviewRdo {
  @ApiProperty({
    description: 'Unique identifier',
    example: 4,
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Comment',
    example: 'Some comment',
  })
  @Expose()
  text: string;

  @ApiProperty({
    description: 'Task identifier',
    example: 4,
  })
  @Expose()
  task: string;

  @ApiProperty({
    description: 'Customer identifier',
    example: '6441aa5173cfe6ec7f835cba',
  })
  @Expose()
  customer: string;

  @ApiProperty({
    description: 'Contractor identifier',
    example: '6441aa5173cfe6ec7f835cba',
  })
  @Expose()
  contractor: string;

  @ApiProperty({
    description: 'Rating',
    example: 4,
  })
  @Expose()
  rating: string;
}
