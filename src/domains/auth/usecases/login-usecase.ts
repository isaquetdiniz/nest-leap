import {
  Access,
  AuthUser,
  AuthUserNotFoundException,
  IGetAuthUserByEmailInCloudGateway,
  IGetAuthUserByEmailRepository,
  AuthUserNeedSetPasswordException,
  AuthUserNotMadeFirstLoginException,
  ILoginInCloudGateway,
} from '@/domains/auth';
import { ILoggerLocal } from '@/shared/protocols';

export interface ILoginUsecase {
  execute(params: ILoginUsecase.Params): Promise<ILoginUsecase.Response>;
}

export namespace ILoginUsecase {
  export type Params = {
    email: string;
    password: string;
  };

  export type Response = { access: Access; authUser: AuthUser };
}

export class LoginUsecase implements ILoginUsecase {
  private logger: ILoggerLocal;

  constructor(
    private readonly getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    private readonly getAuthUserByEmailInCloudGateway: IGetAuthUserByEmailInCloudGateway,
    private readonly loginInCloudGateway: ILoginInCloudGateway,
    logger: ILoggerLocal
  ) {
    this.logger = logger.child({ usecase: 'login' });
  }

  async execute(
    loginParams: ILoginUsecase.Params
  ): Promise<ILoginUsecase.Response> {
    this.logger.logDebug({ message: 'Request Received', data: loginParams });

    const { email, password } = loginParams;

    const authUserFound = await this.getAuthUserByEmailRepository.get(email);

    if (!authUserFound) {
      throw new AuthUserNotFoundException({ email });
    }

    this.logger.logDebug({ message: 'Auth User found', data: authUserFound });

    const cloudAuthUserInCloud =
      await this.getAuthUserByEmailInCloudGateway.get(email);

    if (!cloudAuthUserInCloud) {
      throw new AuthUserNotFoundException({ email });
    }

    this.logger.logDebug({
      message: 'Auth User found in cloud',
      data: cloudAuthUserInCloud,
    });

    const { status: cloudAuthUserStatus } = cloudAuthUserInCloud;

    if (cloudAuthUserStatus === 'FORCE_CHANGE_PASSWORD') {
      throw new AuthUserNotMadeFirstLoginException({ email });
    }

    if (cloudAuthUserStatus === 'NEW_PASSWORD_REQUIRED') {
      throw new AuthUserNeedSetPasswordException({ email });
    }

    const accessDTO = await this.loginInCloudGateway.login({
      email,
      password,
    });

    const access = new Access(accessDTO);
    const authUser = new AuthUser(authUserFound);

    this.logger.logDebug({
      message: 'Auth User logged',
      data: authUser,
    });

    return { access, authUser };
  }
}
