import { File } from '@project/contracts';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'files',
  timestamps: true,
})
export class FileModel extends Document implements File {
  @Prop({
    required: true,
  })
  originalName: string;

  @Prop({
    required: true,
  })
  hashName: string;

  @Prop({
    required: true,
  })
  mimetype: string;

  @Prop({
    required: true,
  })
  path: string;

  @Prop({
    required: true,
  })
  size: number;
}

export const FileSchema = SchemaFactory.createForClass(FileModel);
