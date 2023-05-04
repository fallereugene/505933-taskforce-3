import 'multer';
import { Express } from 'express';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { UploadedFileRdo } from './rdo';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/upload')
  @ApiOperation({ summary: 'Uploading files.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'File is successfully uploaded.',
    type: UploadedFileRdo,
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.writeFile(file);
  }
}
