import { AuthUser } from '@/domains/auth/entities';
import { IGetAuthUserByEmailRepository } from '@/domains/auth/usecases/repos';
import {
  AuthUserNotFoundException,
  AuthUserNotFoundByTokenException,
} from '@/domains/auth/usecases/exceptions';
import { IGetAuthUserByTokenInCloudGateway } from '@/domains/auth/usecases/gateways';

import { ILoggerLocal } from '@/shared/protocols';

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
  private logger: ILoggerLocal;

  constructor(
    private readonly getAuthUserByTokenInCloudGateway: IGetAuthUserByTokenInCloudGateway,
    private readonly getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    logger: ILoggerLocal
  ) {
    this.logger = logger.child({ usecase: 'get-auth-user-by-token' });
  }

  async execute(
    params: IGetAuthUserByTokenUsecase.Params
  ): Promise<IGetAuthUserByTokenUsecase.Result> {
    this.logger.logDebug({ message: 'Request Received', data: params });

    const { token } = params;

    const cloudAuthUserFound = await this.getAuthUserByTokenInCloudGateway.get(
      token
    );

    if (!cloudAuthUserFound) {
      throw new AuthUserNotFoundByTokenException(token);
    }

    this.logger.logDebug({
      message: 'Auth user found by token in cloud',
      data: cloudAuthUserFound,
    });

    const { email } = cloudAuthUserFound;

    const authUserFound = await this.getAuthUserByEmailRepository.get(email);

    if (!authUserFound) {
      throw new AuthUserNotFoundException({ email });
    }

    this.logger.logDebug({
      message: 'Auth user found by email',
      data: authUserFound,
    });

    const authUser = new AuthUser(authUserFound);

    this.logger.logDebug({
      message: 'Auth user found by token',
      data: authUser,
    });

    return authUser;
  }
}
