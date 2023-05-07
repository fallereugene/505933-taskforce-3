import { Injectable } from '@nestjs/common';
import { ApiConfig } from './contracts';
import { HttpService } from '../http';

@Injectable()
export abstract class BaseApi {
  private config: ApiConfig = {
    baseUrl: '',
    headers: {},
  };

  constructor(private readonly http: HttpService) {}

  configure(config: Partial<ApiConfig>) {
    Object.assign(this.config, config);
  }

  protected moduleFactory<T>(Module: new (...args: any[]) => T) {
    return new Module(this.http, this.config);
  }
}
