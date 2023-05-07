import { MongoDatabaseConfig } from '../../shared';
import { CommonConfig, UploaderConfig } from '.';

export type ConfigModuleOptions = CommonConfig &
  UploaderConfig &
  MongoDatabaseConfig;
