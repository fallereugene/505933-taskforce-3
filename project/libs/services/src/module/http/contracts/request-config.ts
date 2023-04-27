import { AxiosHeaders } from 'axios';

export interface IRequestConfig {
    headers: AxiosHeaders['headers'];
    rawResponse?: boolean;
}
