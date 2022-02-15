export interface IGetAuthUserByEmailInCloudGateway {
  get(
    email: IGetAuthUserByEmailInCloudGateway.Params
  ): Promise<IGetAuthUserByEmailInCloudGateway.Result>;
}

export namespace IGetAuthUserByEmailInCloudGateway {
  export type Params = string;

  export type Result = { email: string; status: string } | null;
}
