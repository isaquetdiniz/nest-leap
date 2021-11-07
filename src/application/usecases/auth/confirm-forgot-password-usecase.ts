export interface ConfirmForgotPasswordUsecase {
  confirmForgotPassword(
    confirmParams: ConfirmForgotPasswordUsecase.Params
  ): Promise<ConfirmForgotPasswordUsecase.Result>;
}

export namespace ConfirmForgotPasswordUsecase {
  export type Params = {
    email: string;
    newPassword: string;
    verificationCode: string;
  };

  export type Result = {
    accessToken: string;
    refreshToken: string;
  };
}
