import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment',
    example: 'Some comment',
  })
  text: string;
  @ApiProperty({
    description: 'Task identifier',
    example: 'fbc55fd6-9ac2-4aad-8b79-5adfb2faed8d',
  })
  task: string;
}
