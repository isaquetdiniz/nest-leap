export interface ConfirmForgotPasswordInCloudProvider {
  confirmForgotPassword(
    confirmParams: ConfirmForgotPasswordInCloudProvider.Params
  ): Promise<ConfirmForgotPasswordInCloudProvider.Result>;
}

export namespace ConfirmForgotPasswordInCloudProvider {
  export type Params = {
    email: string;
    newPassword: string;
    verificationCode: string;
  };

  export type Result = void | Error;
}
