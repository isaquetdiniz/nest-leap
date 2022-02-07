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
  constructor(
    private readonly getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    private readonly getAuthUserByEmailInCloudGateway: IGetAuthUserByEmailInCloudGateway,
    private readonly firstLoginInCloudGateway: IFirstLoginInCloudGateway,
    private readonly loginInCloudGateway: ILoginInCloudGateway
  ) {}

  async execute(
    firstLoginParams: IFirstLoginUsecase.Params
  ): Promise<IFirstLoginUsecase.Response> {
    const { email, newPassword, temporaryPassword } = firstLoginParams;

    const authUserDTO = await this.getAuthUserByEmailRepository.get(email);

    if (!authUserDTO) {
      throw new AuthUserNotFoundException({ email });
    }

    const cloudAuthUser = await this.getAuthUserByEmailInCloudGateway.get(
      email
    );

    if (!cloudAuthUser) {
      throw new AuthUserNotFoundException({ email });
    }

    const { status: cloudAuthUserStatus } = cloudAuthUser;

    if (cloudAuthUserStatus !== 'FORCE_CHANGE_PASSWORD') {
      throw new AuthUserAlreadyMadeFirstLoginException(authUserDTO);
    }

    await this.firstLoginInCloudGateway.login({
      email,
      newPassword,
      temporaryPassword,
    });

    const accessDTO = await this.loginInCloudGateway.login({
      email,
      password: newPassword,
    });

    const access = new Access(accessDTO);
    const authUser = new AuthUser(authUserDTO);

    return { access, authUser };
  }
}
