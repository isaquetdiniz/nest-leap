export interface IGetAuthUserByTokenInCloudGateway {
  get(
    token: IGetAuthUserByTokenInCloudGateway.Params
  ): Promise<IGetAuthUserByTokenInCloudGateway.Result>;
}

export namespace IGetAuthUserByTokenInCloudGateway {
  export type Params = string;

  export type Result = { email: string } | null;
}
