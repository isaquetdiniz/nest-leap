import { Validation } from '@/shared/interface/validation/protocols';
import { ValidationException } from '@/shared/helpers';

import {
  IGetAuthUserByEmailRepository,
  AuthUser,
  IGetAuthUserByTokenInCloudGateway,
  GetAuthUserByTokenUsecase,
} from '@/domains/auth';
import { ILoggerLocal } from '@/shared/protocols';

export interface GetUserByTokenRequest {
  token: string;
}

export type GetUserByTokenResponse = AuthUser;

export class GetAuthUserByTokenController {
  private usecase: GetAuthUserByTokenUsecase;
  private logger: ILoggerLocal;

  constructor(
    getAuthUserByTokenInCloudGateway: IGetAuthUserByTokenInCloudGateway,
    getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    private readonly validation: Validation,
    logger: ILoggerLocal
  ) {
    this.usecase = new GetAuthUserByTokenUsecase(
      getAuthUserByTokenInCloudGateway,
      getAuthUserByEmailRepository,
      logger
    );

    this.logger = logger.child({ controller: 'get-auth-user-by-token' });
  }

  async execute(
    request: GetUserByTokenRequest
  ): Promise<GetUserByTokenResponse> {
    this.logger.logDebug({ message: 'Request Received', data: request });

    const hasError = this.validation.validate(request);

    if (hasError) {
      throw new ValidationException(hasError);
    }

    this.logger.logDebug({ message: 'Params validated' });

    const { token } = request;

    const accessTokenWithouBearer = token.replace('Bearer ', '');

    const authUser = await this.usecase.execute({
      token: accessTokenWithouBearer,
    });

    this.logger.logDebug({
      message: 'Auth User found by token',
      data: authUser,
    });

    return authUser;
  }
}
