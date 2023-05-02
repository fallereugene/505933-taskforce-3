import { ApiConfig } from './contracts';
import { httpService } from '../http/http';

export abstract class BaseApi {
  private config: ApiConfig = {
    baseUrl: '',
    headers: {},
  };

  constructor(protected http: typeof httpService) {}

  configure(config: Partial<ApiConfig>) {
    Object.assign(this.config, config);
  }

  protected moduleFactory<T>(Module: new (...args: any[]) => T) {
    return new Module(this.http, this.config);
  }
}
