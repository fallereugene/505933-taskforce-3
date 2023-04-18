import {
  IsISO8601,
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  MaxLength,
  IsEnum,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AvailableCity, AvailableRole, City } from '@project/contracts';
import { Exception, PasswordSetting, UsernameSetting } from '../../constants';

export class CreateAccountDto {
  @ApiProperty({
    description: "User's first name",
    example: 'John',
  })
  @IsString()
  @MinLength(UsernameSetting.MinLength)
  @MaxLength(UsernameSetting.MaxLength)
  firstname: string;

  @ApiProperty({
    description: "User's last name",
    example: 'Doe',
  })
  @IsString()
  @MinLength(UsernameSetting.MinLength)
  @MaxLength(UsernameSetting.MaxLength)
  lastname: string;

  @ApiProperty({
    description: "User's unique email address",
    example: 'john.doe@yahoo.com',
  })
  @IsEmail({}, { message: Exception.InvalidEmail })
  email: string;

  @ApiProperty({
    description: "User's city",
    example: 'Moscow',
  })
  @IsEnum(City)
  city: AvailableCity;

  @ApiProperty({
    description: "User's role",
    example: 'customer',
  })
  @IsString()
  role: AvailableRole;

  @ApiProperty({
    description: 'Password',
    example: '123456',
  })
  @IsString()
  @MinLength(PasswordSetting.MinLength)
  @MaxLength(PasswordSetting.MaxLength)
  password: string;

  @ApiProperty({
    description: "User's city",
    example: '1977-11-11T08:55:00.000Z',
  })
  @IsISO8601({}, { message: Exception.InvalidDate })
  birthDate: string;

  @ApiProperty({
    description: "User's avatar",
    example: 'avatar.png',
    required: false,
  })
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiProperty({
    description: "Contractor's specialization",
    example: ['engineering', 'embedded'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  specialization?: string[];
}
