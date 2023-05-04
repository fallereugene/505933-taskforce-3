import { uploaderConfig } from '@project/services';
import { Inject, Injectable } from '@nestjs/common';
import 'multer';
import { ConfigType } from '@nestjs/config';
import { ensureDir } from 'fs-extra';
import { writeFile } from 'node:fs/promises';

@Injectable()
export class FileService {
  constructor(
    @Inject(uploaderConfig().KEY)
    private readonly applicationConfig: ConfigType<typeof uploaderConfig>
  ) {}
  async writeFile(file: Express.Multer.File): Promise<string> {
    // const uploadDirectoryPath = this.applicationConfig.uploadDirectory;
    // const destinationFile = `${uploadDirectoryPath}/${file.originalname}`;

    // await ensureDir(uploadDirectoryPath);
    // await writeFile(destinationFile, file.buffer);

    //return destinationFile;

    return '';
  }
}
