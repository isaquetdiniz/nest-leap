export interface DeleteUserUsecase {
  delete(
    userParams: DeleteUserUsecase.Params
  ): Promise<DeleteUserUsecase.Result>;
}

export namespace DeleteUserUsecase {
  export type Params = {
    id: string;
  };
  export type Result = void | Error;
}
