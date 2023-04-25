import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

type FileSizeValidationPipeOptions = {
  maxSize: number;
};

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  private maxSize = null;

  constructor(readonly options: FileSizeValidationPipeOptions) {
    Object.assign(this, options);
  }

  transform(value: File) {
    const { size } = value;
    if (this.maxSize) {
      if (size > this.maxSize) {
        throw new BadRequestException(
          `Invalid file size. File should not be larger than ${this.maxSize} kb`
        );
      }
    }
    return value;
  }
}
