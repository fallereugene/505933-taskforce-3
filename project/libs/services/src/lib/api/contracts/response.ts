import { AxiosError } from 'axios';

export type BaseRequestResult = {
  headers: Record<string, any>;
  status: number;
};

export type ResponseSuccess<T = any> = {
  data: T;
  error: null;
} & BaseRequestResult;

export type ResponseError = {
  error: AxiosError;
  data: null;
} & BaseRequestResult;

export type RequestResult<T = any> = ResponseSuccess<T> | ResponseError;
