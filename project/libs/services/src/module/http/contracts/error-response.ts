import { AxiosError, AxiosHeaders } from 'axios';

export type ErrorResponse = {
    statusCode: number;
    headers: AxiosHeaders['headers'];
    error: AxiosError;
    data: null;
};
