import {
  Access,
  AuthUser,
  AuthUserNotFoundException,
  IGetAuthUserByEmailInCloudRepository,
  IGetAuthUserByEmailRepository,
  AuthUserNeedSetPasswordException,
  AuthUserNotMadeFirstLoginException,
  ILoginInCloudGateway,
} from '@/domains/auth';

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
  constructor(
    private readonly getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    private readonly getAuthUserByEmailInCloudRepository: IGetAuthUserByEmailInCloudRepository,
    private readonly loginInCloudGateway: ILoginInCloudGateway
  ) {}

  async execute(
    loginParams: ILoginUsecase.Params
  ): Promise<ILoginUsecase.Response> {
    const { email, password } = loginParams;

    const authUserFound = await this.getAuthUserByEmailRepository.get(email);

    if (!authUserFound) {
      throw new AuthUserNotFoundException({ email });
    }

    const cloudAuthUserInCloud =
      await this.getAuthUserByEmailInCloudRepository.get(email);

    if (!cloudAuthUserInCloud) {
      throw new AuthUserNotFoundException({ email });
    }

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

    return { access, authUser };
  }
}
