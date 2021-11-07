export interface ForgotPasswordInCloudProvider {
  forgotPassword(
    forgotParams: ForgotPasswordInCloudProvider.Params
  ): Promise<ForgotPasswordInCloudProvider.Result>;
}

export namespace ForgotPasswordInCloudProvider {
  export type Params = {
    email: string;
  };

  export type Result = void | Error;
}
