export interface BaseService<TData = any, TResponse = any> {
  readonly execute: (data: TData) => TResponse;
}
