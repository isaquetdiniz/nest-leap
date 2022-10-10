export interface IUsecase<T = unknown, K = unknown> {
  perform(data: T): Promise<K> | K;
}
