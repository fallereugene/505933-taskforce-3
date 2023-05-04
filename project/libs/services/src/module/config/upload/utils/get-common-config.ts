import { Environment } from '../../contracts';
import { CommonConfig } from '../contracts';

export const getCommonConfig = (): CommonConfig => {
  return {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.APPLICATION_PORT, 10),
  };
};
