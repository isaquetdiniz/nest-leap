export interface ForgotPasswordUsecase {
  forgotPassword(
    forgotParams: ForgotPasswordUsecase.Params
  ): Promise<ForgotPasswordUsecase.Result>;
}

export namespace ForgotPasswordUsecase {
  export type Params = {
    email: string;
  };

  export type Result = void;
}
