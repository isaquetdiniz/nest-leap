export interface IUsecase<T, K> {
  perform(data: T): Promise<K> | K;
}
