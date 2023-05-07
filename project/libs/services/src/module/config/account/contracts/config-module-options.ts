import { RabbitConfig, MongoDatabaseConfig } from '../../shared';
import { CommonConfig, JwtConfig } from '.';

export type ConfigModuleOptions = CommonConfig &
  JwtConfig &
  RabbitConfig &
  MongoDatabaseConfig;
