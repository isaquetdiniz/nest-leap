export interface IUsecase<Params = unknown, Result = unknown> {
  perform(params: Params): Result | Promise<Result>;
}
