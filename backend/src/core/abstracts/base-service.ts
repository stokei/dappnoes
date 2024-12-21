export abstract class BaseService<TData = any, TResponse = any> {
  abstract execute(data: TData): TResponse;
}
