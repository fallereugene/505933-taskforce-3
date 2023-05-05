import { Environment } from '../../contracts';

export type CommonConfig = {
  environment: Environment;
  port: number;
  urlServiceAccount: string;
};
