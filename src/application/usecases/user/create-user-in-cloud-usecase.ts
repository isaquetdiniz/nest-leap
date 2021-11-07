export interface CreateUserCloudUsecase {
  create(
    userParams: CreateUserCloudUsecase.Params
  ): Promise<CreateUserCloudUsecase.Result>;
}

export namespace CreateUserCloudUsecase {
  export type Params = {
    email: string;
  };
  export type Result = void;
}
