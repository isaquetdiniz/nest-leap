import { GetAuthUserByTokenUsecase } from '@/domains/auth/usecases';
import { IGetAuthUserByEmailRepository } from '@/domains/auth/usecases/repos';
import { IGetAuthUserByTokenInCloudGateway } from '@/domains/auth/usecases/gateways';
import {
  AuthUserDefaultPresenter,
  AuthUserTransformers,
} from '@/domains/auth/interface/presenters';

import { ILoggerLocal } from '@/shared/protocols';
import { ValidationException } from '@/shared/helpers';
import { Validation } from '@/shared/interface/validation/protocols';

export interface GetUserByTokenRequest {
  token: string;
}

export type GetUserByTokenResponse = AuthUserDefaultPresenter;

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

    const autUserPresenter =
      AuthUserTransformers.generateDefaultPresenter(authUser);

    this.logger.logDebug({
      message: 'Auth User found by token',
      data: autUserPresenter,
    });

    return autUserPresenter;
  }
}
