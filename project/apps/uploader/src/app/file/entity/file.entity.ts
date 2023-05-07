import { File } from '@project/contracts';

export class FileEntity implements File {
  id: string;
  hashName: string;
  mimetype: string;
  originalName: string;
  path: string;
  size: number;

  constructor(file: File) {
    this.fillEntity(file);
  }

  /**
   * Заполнение данными
   * @param task Объект пользователя
   */
  fillEntity(entity: File) {
    Object.assign(this, entity);
  }
}
