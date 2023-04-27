import { AxiosHeaders } from 'axios';

export type SuccessResponse = {
    statusCode: number;
    data: any;
    headers: AxiosHeaders['headers'];
    error: null;
};
