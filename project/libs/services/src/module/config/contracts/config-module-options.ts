import { CommonConfig, DatabaseConfig, JwtConfig } from '.';

export type ConfigModuleOptions = CommonConfig & DatabaseConfig & JwtConfig;
