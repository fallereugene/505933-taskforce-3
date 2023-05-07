import 'multer';
import { Express } from 'express';
import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpStatus,
  Param,
  Inject,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { fillObject, FileSizeValidationPipe } from '@project/utils/utils-core';
import { uploaderConfig, UploaderConfig } from '@project/services';
import { FileService } from './file.service';
import { UploadedFileRdo } from './rdo';

@Controller({
  version: '1',
  path: 'uploader',
})
export class FileController {
  constructor(
    private readonly fileService: FileService,
    @Inject(uploaderConfig().KEY)
    private readonly uploaderConfig: UploaderConfig
  ) {}

  /**
   * Загрузка файла
   * @param file Загружаемый файл
   */
  @Post('/upload')
  @ApiOperation({ summary: 'Uploading files.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'File is successfully uploaded.',
    type: UploadedFileRdo,
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const { serveStatic } = this.uploaderConfig;
    const record = await this.fileService.saveFile(file);
    const path = `${serveStatic}${record.path}`;
    return fillObject(UploadedFileRdo, Object.assign(record, { path }));
  }

  /**
   * TODO: IDOR-уязвимость
   * Получение файла
   * @param fileId Идентификатор файла
   */
  @Get(':fileId')
  @UsePipes(new FileSizeValidationPipe({ maxSize: 500 }))
  @ApiOperation({ summary: 'Getting file.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'File is successfully uploaded.',
    type: UploadedFileRdo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  async getFile(@Param('fileId') fileId: string) {
    const { serveStatic } = this.uploaderConfig;
    const existFile = await this.fileService.getFile(fileId);
    const path = `${serveStatic}${existFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(existFile, { path }));
  }
}
