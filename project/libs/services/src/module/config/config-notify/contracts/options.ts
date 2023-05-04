import { Environment } from '@project/contracts';

export type NotifyConfig = {
  environment: Environment;
  port: number;
  db: {
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
    authBase: string;
  };
  rabbit: {
    host: string;
    password: string;
    port: number;
    user: string;
    queue: string;
    exchange: string;
  };
};
