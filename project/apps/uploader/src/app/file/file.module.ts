import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { getServeStaticOptions } from '@project/services';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { FileModel, FileSchema } from './models';
import { FileRepository } from './service';

@Module({
  imports: [
    ServeStaticModule.forRootAsync(getServeStaticOptions()),
    MongooseModule.forFeature([{ name: FileModel.name, schema: FileSchema }]),
  ],
  providers: [FileService, FileRepository],
  controllers: [FileController],
})
export class FileModule {}
