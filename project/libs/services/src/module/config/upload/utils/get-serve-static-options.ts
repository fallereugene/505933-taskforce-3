import { ConfigService } from '@nestjs/config';
import { UploaderConfig } from '../contracts';
import { ServeStaticModuleAsyncOptions } from '@nestjs/serve-static';
import { ConfigUploadNamespace } from '../constants';

export const getServeStaticOptions = (): ServeStaticModuleAsyncOptions => {
  return {
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const { serveStatic, uploadDirectory } =
        configService.get<UploaderConfig>(ConfigUploadNamespace.Uploader);
      return [
        {
          rootPath: uploadDirectory,
          serveRoot: serveStatic,
          serveStaticOptions: {
            fallthrough: true,
            etag: true,
          },
        },
      ];
    },
  };
};
