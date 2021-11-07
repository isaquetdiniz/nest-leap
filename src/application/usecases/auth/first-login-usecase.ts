export interface FirstLoginUsecase {
  firstLogin(
    loginParams: FirstLoginUsecase.Params
  ): Promise<FirstLoginUsecase.Result>;
}

export namespace FirstLoginUsecase {
  export type Params = {
    email: string;
    newPassword: string;
    temporaryPassword: string;
  };

  export type Result = {
    accessToken: string;
    refreshToken: string;
  };
}
