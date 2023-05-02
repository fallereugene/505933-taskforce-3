export type ResponseSuccess<T = any> = {
  data: T;
  error: null;
  headers: Record<string, any>;
  status: number;
};
