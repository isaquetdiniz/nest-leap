export interface IUsecase<T = any, K = any> {
  perform(data: T): Promise<K> | K;
}
