import {
  AuthUserNotFoundException,
  AuthUserNotMadeFirstLoginException,
  IForgotPasswordInCloudGateway,
  IGetAuthUserByEmailInCloudGateway,
  IGetAuthUserByEmailRepository,
} from '@/domains/auth';
import { ILoggerLocal } from '@/shared/protocols';

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
  private logger: ILoggerLocal;

  constructor(
    private readonly getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    private readonly getAuthUserByEmailInCloudGateway: IGetAuthUserByEmailInCloudGateway,
    private readonly forgotPasswordInCloudGateway: IForgotPasswordInCloudGateway,
    logger: ILoggerLocal
  ) {
    this.logger = logger.child({ usecase: 'forgot-password' });
  }

  async execute(
    forgotParams: IForgotPasswordUsecase.Params
  ): Promise<IForgotPasswordUsecase.Response> {
    this.logger.logDebug({ message: 'Request Received', data: forgotParams });

    const { email } = forgotParams;

    const authUserFound = await this.getAuthUserByEmailRepository.get(email);

    if (!authUserFound) {
      throw new AuthUserNotFoundException({ email });
    }

    this.logger.logDebug({ message: 'Auth user found', data: authUserFound });

    const cloudAuthUser = await this.getAuthUserByEmailInCloudGateway.get(
      email
    );

    if (!cloudAuthUser) {
      throw new AuthUserNotFoundException({ email });
    }

    this.logger.logDebug({
      message: 'Auth User found in cloud',
      data: cloudAuthUser,
    });

    const { status: cloudAuthUserStatus } = cloudAuthUser;

    if (cloudAuthUserStatus === 'FORCE_CHANGE_PASSWORD') {
      throw new AuthUserNotMadeFirstLoginException({ email });
    }

    await this.forgotPasswordInCloudGateway.forgot({ email });

    this.logger.logDebug({
      message: 'Auth User forgot password',
      data: email,
    });
  }
}
