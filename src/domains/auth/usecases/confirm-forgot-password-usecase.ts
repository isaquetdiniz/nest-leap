import {
  AuthUserNotFoundException,
  AuthUserNotMadeFirstLoginException,
  IConfirmForgotPasswordInCloudGateway,
  IGetAuthUserByEmailInCloudGateway,
  IGetAuthUserByEmailRepository,
} from '@/domains/auth';

export interface IConfirmForgotPasswordUsecase {
  execute(
    params: IConfirmForgotPasswordUsecase.Params
  ): Promise<IConfirmForgotPasswordUsecase.Response>;
}

export namespace IConfirmForgotPasswordUsecase {
  export type Params = {
    email: string;
    verificationCode: string;
    newPassword: string;
  };
  export type Response = void;
}

export class ConfirmForgotPasswordUsecase
  implements IConfirmForgotPasswordUsecase
{
  constructor(
    private readonly getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    private readonly getAuthUserByEmailInCloudGateway: IGetAuthUserByEmailInCloudGateway,
    private readonly confirmForgotPasswordInCloudGateway: IConfirmForgotPasswordInCloudGateway
  ) {}

  async execute(
    confirmForgotParams: IConfirmForgotPasswordUsecase.Params
  ): Promise<IConfirmForgotPasswordUsecase.Response> {
    const { email, verificationCode, newPassword } = confirmForgotParams;

    const authUserFound = await this.getAuthUserByEmailRepository.get(email);

    if (!authUserFound) {
      throw new AuthUserNotFoundException({ email });
    }

    const cloudAuthUserFound = await this.getAuthUserByEmailInCloudGateway.get(
      email
    );

    if (!cloudAuthUserFound) {
      throw new AuthUserNotFoundException({ email });
    }

    const { status: cloudAuthUserStatus } = cloudAuthUserFound;

    if (cloudAuthUserStatus === 'FORCE_CHANGE_PASSWORD') {
      throw new AuthUserNotMadeFirstLoginException({ email });
    }

    await this.confirmForgotPasswordInCloudGateway.confirm({
      email,
      verificationCode,
      newPassword,
    });
  }
}
