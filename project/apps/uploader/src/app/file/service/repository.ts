import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { FileModel } from '../models';
import { Model } from 'mongoose';
import { FileEntity } from '../entity';
import { File } from '@project/contracts';

@Injectable()
export class FileRepository {
  constructor(
    @InjectModel(FileModel.name)
    private readonly fileModel: Model<HydratedDocument<FileModel>>
  ) {}

  /**
   * Создание сущности Файл
   * @param item Переданные данные
   */
  async create(item: FileEntity): Promise<File> {
    const file = new this.fileModel(item);
    return file.save();
  }

  /**
   * Поиск записи по идентификатору
   * @param id Идентификатор записи
   */
  async findById(id: string): Promise<File | null> {
    return this.fileModel.findOne({ _id: id }).exec();
  }
}
