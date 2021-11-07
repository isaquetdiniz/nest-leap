export interface LoadUserByTokenCloudUsecase {
  loadUser(
    loadUserParams: LoadUserByTokenCloudUsecase.Params
  ): Promise<LoadUserByTokenCloudUsecase.Result>;
}

export namespace LoadUserByTokenCloudUsecase {
  export type Params = {
    token: string;
  };

  export type Result = {
    username: string;
    email: string;
  };
}
