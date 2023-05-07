import { Injectable } from '@nestjs/common';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import { ResponseSuccess, ResponseError } from './contracts';

@Injectable()
export class HttpService {
  private readonly http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      timeout: 10000,
    });
  }

  get service() {
    return this.http;
  }

  async get(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<ResponseSuccess | ResponseError> {
    return this.http
      .get(url, config)
      .then((r) => HttpService.responseSuccessHandler(r))
      .catch((e) => HttpService.responseErrorHandler(e));
  }

  async post(
    url: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): Promise<ResponseSuccess | ResponseError> {
    return this.http
      .post(url, data, config)
      .then((response) => HttpService.responseSuccessHandler(response))
      .catch((response) => HttpService.responseErrorHandler(response));
  }

  async put(
    url: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): Promise<ResponseSuccess | ResponseError> {
    return this.http
      .put(url, data, config)
      .then((response) => HttpService.responseSuccessHandler(response))
      .catch((response) => HttpService.responseErrorHandler(response));
  }

  async patch(
    url: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): Promise<ResponseSuccess | ResponseError> {
    return this.http
      .patch(url, data, config)
      .then((response) => HttpService.responseSuccessHandler(response))
      .catch((response) => HttpService.responseErrorHandler(response));
  }

  async delete(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<ResponseSuccess | ResponseError> {
    return this.http
      .delete(url, config)
      .then((response) => HttpService.responseSuccessHandler(response))
      .catch((response) => HttpService.responseErrorHandler(response));
  }

  private static responseSuccessHandler(response: AxiosResponse<any>) {
    if (response) {
      const { status, data, headers } = response;
      return {
        status,
        data,
        headers,
        error: null,
      };
    }
  }

  private static responseErrorHandler(error: AxiosError): ResponseError {
    if (error.response) {
      const { status, headers } = error.response;
      return {
        error,
        status,
        data: null,
        headers,
      };
    }

    throw error;
  }
}

export { ResponseError, ResponseSuccess };
