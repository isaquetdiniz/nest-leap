export interface RefreshTokenUsecase {
  refresh(
    refreshParams: RefreshTokenUsecase.Params
  ): Promise<RefreshTokenUsecase.Result>;
}

export namespace RefreshTokenUsecase {
  export type Params = {
    refreshToken: string;
  };

  export type Result = {
    accessToken: string;
    refreshToken: string;
  };
}
