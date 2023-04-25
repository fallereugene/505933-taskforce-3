import {
  IsISO8601,
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  IsNumber,
  IsPositive,
  IsArray,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AvailableCity, City } from '@project/contracts';
import { TaskSetting } from '../../constants';

export class CreateTaskDto {
  @ApiProperty({
    description: "Task's title",
    example: 'Todo title',
  })
  @IsString()
  @MinLength(TaskSetting.TitleMinLength)
  @MaxLength(TaskSetting.TitleMaxLength)
  title: string;

  @ApiProperty({
    description: 'Extended description',
    example: 'Details about task',
  })
  @IsString()
  @MaxLength(TaskSetting.DescriptionMaxLength)
  description: string;

  @ApiProperty({
    description: 'New or existing category',
    example: 'engineering',
  })
  @IsString()
  category: string;

  @ApiProperty({
    description: 'Service cost',
    example: 1000,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  cost?: number;

  @ApiProperty({
    description: 'Date of completion task',
    example: '2023-04-10T00:00:00.000Z',
  })
  @IsOptional()
  @IsISO8601()
  dueDate?: Date;

  @ApiProperty({
    description: 'Picture',
    example: 'example.png',
    default: '',
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: 'The address where the task should be performed',
    example: 'Moscow, Presnenskaya embankment, 12, office No. 2',
    default: '',
  })
  @MinLength(TaskSetting.AddressMinLength)
  @MaxLength(TaskSetting.AddressMaxLength)
  @IsOptional()
  address?: string;

  @ApiProperty({
    description: 'Tags for the task',
    example: ['engineering', 'moscow'],
  })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiProperty({
    description: "User's city",
    example: 'Moscow',
  })
  @IsEnum(City)
  city: AvailableCity;
}
