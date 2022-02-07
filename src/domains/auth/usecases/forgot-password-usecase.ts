import {
  AuthUserNotFoundException,
  AuthUserNotMadeFirstLoginException,
  IForgotPasswordInCloudGateway,
  IGetAuthUserByEmailInCloudGateway,
  IGetAuthUserByEmailRepository,
} from '@/domains/auth';

export interface IForgotPasswordUsecase {
  execute(
    params: IForgotPasswordUsecase.Params
  ): Promise<IForgotPasswordUsecase.Response>;
}

export namespace IForgotPasswordUsecase {
  export type Params = { email: string };
  export type Response = void;
}

export class ForgotPasswordUsecase implements IForgotPasswordUsecase {
  constructor(
    private readonly getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    private readonly getAuthUserByEmailInCloudGateway: IGetAuthUserByEmailInCloudGateway,
    private readonly forgotPasswordInCloudGateway: IForgotPasswordInCloudGateway
  ) {}

  async execute(
    forgotParams: IForgotPasswordUsecase.Params
  ): Promise<IForgotPasswordUsecase.Response> {
    const { email } = forgotParams;

    const authUserFound = await this.getAuthUserByEmailRepository.get(email);

    if (!authUserFound) {
      throw new AuthUserNotFoundException({ email });
    }

    const cloudAuthUser = await this.getAuthUserByEmailInCloudGateway.get(
      email
    );

    if (!cloudAuthUser) {
      throw new AuthUserNotFoundException({ email });
    }

    const { status: cloudAuthUserStatus } = cloudAuthUser;

    if (cloudAuthUserStatus === 'FORCE_CHANGE_PASSWORD') {
      throw new AuthUserNotMadeFirstLoginException({ email });
    }

    await this.forgotPasswordInCloudGateway.forgot({ email });
  }
}
