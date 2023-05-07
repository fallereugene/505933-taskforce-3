import { RequestResult, ResponseError, ResponseSuccess } from '../contracts';

type UnboxPromise<T extends Promise<any>> = T extends Promise<infer U>
  ? U
  : never;

export type ActionConfig<
  TResult extends RequestResult<any>,
  TResultData = TResult extends ResponseSuccess ? TResult : never,
  TErrorData = TResult extends ResponseError ? ResponseError : never
> = {
  onSuccess?(requestResultData: TResultData): void;
  onError?(requestErrorData: TErrorData): void;
};

/**
 * Функция-обертка, позволяющая вызывать метод API без необходимости
 * использовать try/catch конструкцию, оперируя уровнем передаваемой конфигурации.
 * @param invokedApiMethod Переданный вызванный метод API
 * @param config Конфигурация
 */
export const invoke = async <
  TData,
  TApiMethod extends Promise<RequestResult<TData>>,
  TResult extends UnboxPromise<TApiMethod>
>(
  invokedApiMethod: TApiMethod,
  config?: ActionConfig<TResult>
) => {
  const result = await invokedApiMethod;
  if (config) {
    const { onSuccess, onError } = config;
    if (result.error) {
      typeof onError === 'function' && onError(result as any);
    } else {
      typeof onSuccess === 'function' && onSuccess(result as any);
    }
  }
};
