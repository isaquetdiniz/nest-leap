export interface ConfirmForgotPasswordInCloudProvider {
  confirm(
    userParams: ConfirmForgotPasswordInCloudProvider.Params
  ): Promise<ConfirmForgotPasswordInCloudProvider.Result>;
}

export namespace ConfirmForgotPasswordInCloudProvider {
  export type Params = {
    email: string;
    verificationCode: string;
    newPassword: String;
  };

  export type Result = void | Error;
}
