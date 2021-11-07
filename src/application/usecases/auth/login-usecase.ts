export interface LoginUsecase {
  login(loginParams: LoginUsecase.Params): Promise<LoginUsecase.Result>;
}

export namespace LoginUsecase {
  export type Params = {
    email: string;
    password: string;
  };

  export type Result = {
    accessToken: string;
    refreshToken: string;
  };
}
