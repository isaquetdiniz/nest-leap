import {
  AuthUser,
  AuthUserNotFoundByTokenException,
  AuthUserNotFoundException,
  IGetAuthUserByTokenInCloudGateway,
  IGetAuthUserByEmailRepository,
} from '@/domains/auth';

export interface IGetAuthUserByTokenUsecase {
  execute(
    params: IGetAuthUserByTokenUsecase.Params
  ): Promise<IGetAuthUserByTokenUsecase.Result>;
}

export namespace IGetAuthUserByTokenUsecase {
  export type Params = {
    token: string;
  };
  export type Result = AuthUser;
}

export class GetAuthUserByTokenUsecase implements IGetAuthUserByTokenUsecase {
  constructor(
    private readonly getAuthUserByTokenInCloudGateway: IGetAuthUserByTokenInCloudGateway,
    private readonly getAuthUserByEmailRepository: IGetAuthUserByEmailRepository
  ) {}

  async execute(
    params: IGetAuthUserByTokenUsecase.Params
  ): Promise<IGetAuthUserByTokenUsecase.Result> {
    const { token } = params;

    const cloudAuthUserFound = await this.getAuthUserByTokenInCloudGateway.get(
      token
    );

    if (!cloudAuthUserFound) {
      throw new AuthUserNotFoundByTokenException(token);
    }

    const { email } = cloudAuthUserFound;

    const authUserFound = await this.getAuthUserByEmailRepository.get(email);

    if (!authUserFound) {
      throw new AuthUserNotFoundException({ email });
    }

    const authUser = new AuthUser(authUserFound);

    return authUser;
  }
}
