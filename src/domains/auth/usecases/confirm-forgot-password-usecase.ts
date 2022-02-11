import {
  AuthUserNotFoundException,
  AuthUserNotMadeFirstLoginException,
  IConfirmForgotPasswordInCloudGateway,
  IGetAuthUserByEmailInCloudGateway,
  IGetAuthUserByEmailRepository,
} from '@/domains/auth';
import { ILoggerLocal } from '@/shared/protocols';

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
  private logger: ILoggerLocal;

  constructor(
    private readonly getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    private readonly getAuthUserByEmailInCloudGateway: IGetAuthUserByEmailInCloudGateway,
    private readonly confirmForgotPasswordInCloudGateway: IConfirmForgotPasswordInCloudGateway,
    logger: ILoggerLocal
  ) {
    this.logger = logger.child({ usecase: 'forgot-password' });
  }

  async execute(
    confirmForgotParams: IConfirmForgotPasswordUsecase.Params
  ): Promise<IConfirmForgotPasswordUsecase.Response> {
    this.logger.logDebug({
      message: 'Request Received',
      data: confirmForgotParams,
    });

    const { email, verificationCode, newPassword } = confirmForgotParams;

    const authUserFound = await this.getAuthUserByEmailRepository.get(email);

    if (!authUserFound) {
      throw new AuthUserNotFoundException({ email });
    }

    this.logger.logDebug({
      message: 'Auth User found',
      data: authUserFound,
    });

    const cloudAuthUserFound = await this.getAuthUserByEmailInCloudGateway.get(
      email
    );

    if (!cloudAuthUserFound) {
      throw new AuthUserNotFoundException({ email });
    }

    this.logger.logDebug({
      message: 'Auth User found in cloud',
      data: cloudAuthUserFound,
    });

    const { status: cloudAuthUserStatus } = cloudAuthUserFound;

    if (cloudAuthUserStatus === 'FORCE_CHANGE_PASSWORD') {
      throw new AuthUserNotMadeFirstLoginException({ email });
    }

    await this.confirmForgotPasswordInCloudGateway.confirm({
      email,
      verificationCode,
      newPassword,
    });

    this.logger.logDebug({
      message: 'Auth User confirm forgot password',
      data: confirmForgotParams,
    });
  }
}
