export interface IForgotPasswordInCloudGateway {
  forgot(
    params: IForgotPasswordInCloudGateway.Params
  ): Promise<IForgotPasswordInCloudGateway.Result>;
}

export namespace IForgotPasswordInCloudGateway {
  export type Params = {
    email: string;
  };

  export type Result = void;
}
