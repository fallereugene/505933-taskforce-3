import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Review text',
    example: 'Some review text',
  })
  text: string;
  @ApiProperty({
    description: 'Task identifier',
    example: 'fbc55fd6-9ac2-4aad-8b79-5adfb2faed8d',
  })
  task: string;
  @ApiProperty({
    description: 'Rating',
    example: 4,
  })
  rating: number;
}
