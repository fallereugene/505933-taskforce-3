import { Environment } from '@project/contracts';

export type NotifyConfig = {
  environment: Environment;
  applicationPort: number;
  host: string;
  dbPort: number;
  user: string;
  name: string;
  password: string;
  authBase: string;
  rmqPassword: string;
  rmqUser: string;
};
