import { CommonConfig, DatabaseConfig, JwtConfig, RabbitMqConfig } from '.';

export type ConfigModuleOptions = CommonConfig &
  DatabaseConfig &
  JwtConfig &
  RabbitMqConfig;
