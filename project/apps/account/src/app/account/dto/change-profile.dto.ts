import {
  IsString,
  MinLength,
  MaxLength,
  IsISO8601,
  IsOptional,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exception, UsernameSetting } from '../../constants';

export class ChangeProfileDto {
  @ApiProperty({
    description: "User's first name",
    example: 'John',
  })
  @IsString()
  @MinLength(UsernameSetting.MinLength)
  @MaxLength(UsernameSetting.MaxLength)
  firstname?: string;

  @ApiProperty({
    description: "User's last name",
    example: 'Doe',
  })
  @IsString()
  @MinLength(UsernameSetting.MinLength)
  @MaxLength(UsernameSetting.MaxLength)
  lastname?: string;

  @ApiProperty({
    description: "User's city",
    example: '1977-11-11T08:55:00.000Z',
  })
  @IsISO8601({}, { message: Exception.InvalidDate })
  @IsOptional()
  birthDate?: string;

  @ApiProperty({
    description: 'Extended profile information',
    example: 'Some text',
  })
  @IsString()
  @MaxLength(UsernameSetting.MaxDescriptionLength)
  @IsOptional()
  info?: string;

  @ApiProperty({
    description: 'User skills list',
    example: ['frontend', 'backend'],
  })
  @IsArray()
  @IsOptional()
  specialization?: string[];
}
