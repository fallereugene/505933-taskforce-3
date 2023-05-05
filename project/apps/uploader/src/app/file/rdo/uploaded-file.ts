import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class UploadedFileRdo {
  @ApiProperty({
    description: "File's unique identifier.",
    example: '6454d59863c251ba693cd2e6',
  })
  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id.toString())
  id: string;

  @ApiProperty({
    description: 'Original name.',
    example: 'filename.jpg',
  })
  @Expose()
  originalName: string;

  @ApiProperty({
    description: 'File hash.',
    example: '87a5eacc-a172-44cd-906a-ad1e52527114.png',
  })
  @Expose()
  hashName: string;

  @ApiProperty({
    description: 'Mimetype.',
    example: 'image/png',
  })
  @Expose()
  mimetype: string;

  @ApiProperty({
    description: 'File size',
    example: '393035',
  })
  @Expose()
  size: number;

  @ApiProperty({
    description: 'Relative file path',
    example: '/2023/05/87a5eacc-a172-44cd-906a-ad1e52527114.png',
  })
  @Expose()
  path: string;
}
