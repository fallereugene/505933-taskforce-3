import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@project/contracts';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Task contractor',
    example: 'fbc55fd6-9ac2-4aad-8b79-5adfb2faed8d',
  })
  @IsOptional()
  @IsString()
  contractor?: string;

  @ApiProperty({
    description: 'Tags for the task',
    example: 1,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
