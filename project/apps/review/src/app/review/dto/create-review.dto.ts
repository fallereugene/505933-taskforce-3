import {
  IsString,
  MinLength,
  MaxLength,
  Min,
  Max,
  IsNumber,
  IsMongoId,
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
    description: 'Contractor identifier',
    example: '6441aa5173cfe6ec7f835cba',
  })
  @IsMongoId()
  contractor: string;

  @ApiProperty({
    description: 'Task identifier',
    example: 4,
  })
  @IsNumber()
  taskId: number;

  @ApiProperty({
    description: 'Rating',
    example: 4,
  })
  @IsNumber()
  @Min(ReviewSetting.MinRating)
  @Max(ReviewSetting.MaxRating)
  rating: number;
}
