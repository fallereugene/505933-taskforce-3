import 'multer';
import dayjs from 'dayjs';
import * as crypto from 'node:crypto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ensureDir } from 'fs-extra';
import { writeFile } from 'node:fs/promises';
import { extension } from 'mime-types';
import { uploaderConfig, UploaderConfig } from '@project/services';
import { FileEntity } from './entity';
import { FileRepository } from './service';

@Injectable()
export class FileService {
  constructor(
    @Inject(uploaderConfig().KEY)
    private readonly uploaderConfig: UploaderConfig,
    private repository: FileRepository
  ) {}

  /**
   * Сохранение файла в систему.
   * @param file Переданный файл
   * @returns Метаданные сохраненного файла: хэш, оригинальное имя и т.д.
   */
  private async writeFile(file: Express.Multer.File): Promise<any> {
    const [year, month] = dayjs().format('YYYY MM').split(' ');
    const { uploadDirectory } = this.uploaderConfig;
    const subDirectory = `${year}/${month}`;

    const uuid = crypto.randomUUID();
    const fileExtension = extension(file.mimetype);
    const hashName = `${uuid}.${fileExtension}`;

    const uploadDirectoryPath = `${uploadDirectory}/${subDirectory}`;
    const destinationFile = `${uploadDirectoryPath}/${hashName}`;

    await ensureDir(uploadDirectoryPath);
    await writeFile(destinationFile, file.buffer);

    return {
      hashName,
      fileExtension,
      subDirectory,
      path: `/${subDirectory}/${hashName}`,
    };
  }

  /**
   * Сохранение файла в системе и создание соответствующей записи в БД
   * @param file Переданный файл
   */
  async saveFile(file: Express.Multer.File) {
    const record = await this.writeFile(file);
    const newFile = new FileEntity({
      size: file.size,
      hashName: record.hashName,
      mimetype: file.mimetype,
      originalName: file.originalname,
      path: record.path,
    });
    return this.repository.create(newFile);
  }

  /**
   * Получение файла из системы
   * @param fileId Идентификатор файла
   */
  async getFile(fileId: string) {
    const existFile = await this.repository.findById(fileId);

    if (!existFile) {
      throw new NotFoundException(`File with ${fileId} not found.`);
    }

    return existFile;
  }
}
