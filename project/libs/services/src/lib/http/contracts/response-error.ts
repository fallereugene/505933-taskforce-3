import { AxiosError } from 'axios';

export type ResponseError = {
  error: AxiosError;
  data: null;
  headers: Record<string, any>;
  status: number;
};
