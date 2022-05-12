import {
  Access,
  IGetAuthUserByEmailRepository,
  AuthUserNotFoundException,
  AuthUserAlreadyMadeFirstLoginException,
  IGetAuthUserByEmailInCloudGateway,
  AuthUser,
  IFirstLoginInCloudGateway,
  ILoginInCloudGateway,
} from '@/domains/auth';
import { ILoggerLocal } from '@/shared/protocols';

export interface IFirstLoginUsecase {
  execute(
    params: IFirstLoginUsecase.Params
  ): Promise<IFirstLoginUsecase.Response>;
}

export namespace IFirstLoginUsecase {
  export type Params = {
    email: string;
    newPassword: string;
    temporaryPassword: string;
  };

  export type Response = { access: Access; authUser: AuthUser };
}

export class FirstLoginUsecase implements IFirstLoginUsecase {
  private logger: ILoggerLocal;

  constructor(
    private readonly getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    private readonly getAuthUserByEmailInCloudGateway: IGetAuthUserByEmailInCloudGateway,
    private readonly firstLoginInCloudGateway: IFirstLoginInCloudGateway,
    private readonly loginInCloudGateway: ILoginInCloudGateway,
    logger: ILoggerLocal
  ) {
    this.logger = logger.child({ usecase: 'first-login' });
  }

  async execute(
    firstLoginParams: IFirstLoginUsecase.Params
  ): Promise<IFirstLoginUsecase.Response> {
    this.logger.logDebug({
      message: 'Request Received',
      data: firstLoginParams,
    });

    const { email, newPassword, temporaryPassword } = firstLoginParams;

    const authUser = await this.getAuthUserByEmailRepository.get(email);

    if (!authUser) {
      throw new AuthUserNotFoundException({ email });
    }

    this.logger.logDebug({
      message: 'Auth User found',
      data: authUser,
    });

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

    if (cloudAuthUserStatus !== 'FORCE_CHANGE_PASSWORD') {
      throw new AuthUserAlreadyMadeFirstLoginException(authUser);
    }

    await this.firstLoginInCloudGateway.login({
      email,
      newPassword,
      temporaryPassword,
    });

    const access = await this.loginInCloudGateway.login({
      email,
      password: newPassword,
    });

    this.logger.logDebug({
      message: 'Auth User made first login',
      data: authUser,
    });

    return { access, authUser };
  }
}
