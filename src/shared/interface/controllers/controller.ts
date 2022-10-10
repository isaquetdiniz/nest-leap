export interface IController<T = unknown, K = unknown> {
  execute(request: T): Promise<K> | K;
}
