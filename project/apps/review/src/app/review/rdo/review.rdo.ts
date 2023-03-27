import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ReviewRdo {
  @ApiProperty({
    description: 'Unique identifier',
    example: '4ff6e921-36c4-4f80-ae41-919c06c0c5c3',
  })
  @Expose({ name: '_id' })
  id?: string;
  @ApiProperty({
    description: 'Comment',
    example: 'Some comment',
  })
  @Expose()
  text: string;
  @ApiProperty({
    description: 'Task identifier',
    example: 'ahw55fd6-9ac2-4aad-8b79-5adfb2faeyui',
  })
  @Expose()
  task: string;
  @ApiProperty({
    description: 'Rating',
    example: 4,
  })
  @Expose()
  rating: string;
}
