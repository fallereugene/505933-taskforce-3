import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { IRequestConfig, ErrorResponse, SuccessResponse } from './contracts';

@Injectable()
export class Http {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      withCredentials: true,
      timeout: 10000,
    });
  }

  async get<T = any>(
    url: string,
    config?: IRequestConfig
  ): Promise<SuccessResponse | ErrorResponse> {
    return this.http
      .get<T>(url, config)
      .then((response) => Http.handleSuccess(response))
      .catch((response) => Http.handleError(response));
  }

  async post<T = any>(
    url: string,
    data: any,
    config?: IRequestConfig
  ): Promise<SuccessResponse | ErrorResponse> {
    return this.http
      .post<T>(url, data, config)
      .then((response) => Http.handleSuccess(response))
      .catch((response) => Http.handleError(response));
  }

  async put<T = any>(
    url: string,
    data: any,
    config?: IRequestConfig
  ): Promise<SuccessResponse | ErrorResponse> {
    return this.http
      .put<T>(url, data, config)
      .then((response) => Http.handleSuccess(response))
      .catch((response) => Http.handleError(response));
  }

  async patch<T = any>(
    url: string,
    data: any,
    config?: IRequestConfig
  ): Promise<SuccessResponse | ErrorResponse> {
    return this.http
      .patch<T>(url, data, config)
      .then((response) => Http.handleSuccess(response))
      .catch((response) => Http.handleError(response));
  }

  async delete<T = any>(url: string, data: any, config?: IRequestConfig) {
    return this.http
      .delete<T>(url, { data, ...config })
      .then((response) => Http.handleSuccess(response))
      .catch((response) => Http.handleError(response));
  }

  private static handleSuccess(response: AxiosResponse): SuccessResponse {
    const { status, data, headers } = response;
    return {
      statusCode: status,
      data,
      headers,
      error: null,
    };
  }

  private static handleError(error: AxiosError): ErrorResponse {
    if (error.response) {
      const { status, headers } = error.response;
      return {
        error,
        statusCode: status,
        data: null,
        headers,
      };
    }

    throw error;
  }
}
