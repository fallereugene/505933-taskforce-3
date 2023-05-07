import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RatingListRdo {
  @ApiProperty({
    description: 'Unique identifier',
    example: 4,
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: "Contractors's identifier.",
    example: '644d0705616bbce0e37ee7d9',
  })
  @Expose({ name: 'contractorId' })
  contractor: string;

  @ApiProperty({
    description: "Contractors's total rating.",
    example: 3.7,
  })
  @Expose()
  totalRating: string;
}
