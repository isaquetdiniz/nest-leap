export interface IValidation<T = unknown, K = unknown> {
  request(params: T): void;
  response(params: K): void;
}
