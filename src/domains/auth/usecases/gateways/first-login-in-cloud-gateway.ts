export interface IFirstLoginInCloudGateway {
  login(
    userParams: IFirstLoginInCloudGateway.Params
  ): Promise<IFirstLoginInCloudGateway.Result>;
}

export namespace IFirstLoginInCloudGateway {
  export type Params = {
    email: string;
    newPassword: string;
    temporaryPassword: string;
  };

  export type Result = void;
}
