export interface IConfirmForgotPasswordInCloudGateway {
  confirm(
    params: IConfirmForgotPasswordInCloudGateway.Params
  ): Promise<IConfirmForgotPasswordInCloudGateway.Result>;
}

export namespace IConfirmForgotPasswordInCloudGateway {
  export type Params = {
    email: string;
    verificationCode: string;
    newPassword: string;
  };

  export type Result = void;
}
