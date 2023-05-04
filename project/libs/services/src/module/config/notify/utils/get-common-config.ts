import { Environment } from '../../contracts';
import { CommonNotifyConfig } from '../contracts';

export const getCommonConfig = (): CommonNotifyConfig => {
  return {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.APPLICATION_PORT, 10),
  };
};
