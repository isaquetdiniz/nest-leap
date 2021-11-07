export interface RefreshTokenInCloudProvider {
  refresh(
    refreshParams: RefreshTokenInCloudProvider.Params
  ): Promise<RefreshTokenInCloudProvider.Result>;
}

export namespace RefreshTokenInCloudProvider {
  export type Params = {
    refreshToken: string;
  };

  export type Result = {
    accessToken: string;
    refreshToken: string;
  };
}
