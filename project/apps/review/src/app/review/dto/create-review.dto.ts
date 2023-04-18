import {
  IsString,
  MinLength,
  MaxLength,
  Min,
  Max,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ReviewSetting } from '../../constants';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Review text',
    example: 'Some review text',
  })
  @IsString()
  @MinLength(ReviewSetting.MinLength)
  @MaxLength(ReviewSetting.MaxLength)
  text: string;

  @ApiProperty({
    description: 'Task identifier',
    example: 'fbc55fd6-9ac2-4aad-8b79-5adfb2faed8d',
  })
  @IsString()
  task: string;

  @ApiProperty({
    description: 'Rating',
    example: 4,
  })
  @IsNumber()
  @Min(ReviewSetting.MinRating)
  @Max(ReviewSetting.MaxRating)
  rating: number;
}
