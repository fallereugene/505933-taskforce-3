import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CommentSetting } from '../../constants';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment',
    example: 'Some comment',
  })
  @IsString()
  @MinLength(CommentSetting.MinLength)
  @MaxLength(CommentSetting.MaxLength)
  text: string;

  @ApiProperty({
    description: 'Task identifier',
    example: 'fbc55fd6-9ac2-4aad-8b79-5adfb2faed8d',
  })
  @IsString()
  task: string;
}
