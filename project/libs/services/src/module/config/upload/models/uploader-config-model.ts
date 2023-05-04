import { IsString } from 'class-validator';
import { ValidationMessage } from '../constants';
import { UploaderConfig } from '../contracts';

export class UploaderConfigModel implements UploaderConfig {
  @IsString({
    message: ValidationMessage.UploadDirectoryIsRequired,
  })
  uploadDirectory: string;
}
