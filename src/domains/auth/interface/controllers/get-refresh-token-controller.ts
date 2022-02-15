import { Validation } from '@/shared/interface/validation/protocols';
import { ValidationException } from '@/shared/helpers';

import {
  AccessDTO,
  IGetRefreshTokenInCloudGateway,
  GetRefreshTokenUsecase,
} from '@/domains/auth';
import { ILoggerLocal } from '@/shared/protocols';

export interface GetRefreshTokenRequest {
  refreshToken: string;
}

export type GetRefreshTokenResponse = AccessDTO;

export class GetRefreshTokenController {
  private usecase: GetRefreshTokenUsecase;
  private logger: ILoggerLocal;

  constructor(
    getRefreshTokenInCloudGateway: IGetRefreshTokenInCloudGateway,
    private readonly validation: Validation,
    logger: ILoggerLocal
  ) {
    this.usecase = new GetRefreshTokenUsecase(
      getRefreshTokenInCloudGateway,
      logger
    );

    this.logger = logger.child({ controller: 'get-refresh-token' });
  }

  async execute(
    request: GetRefreshTokenRequest
  ): Promise<GetRefreshTokenResponse> {
    this.logger.logDebug({ message: 'Request Received', data: request });

    const hasError = this.validation.validate(request);

    if (hasError) {
      throw new ValidationException(hasError);
    }

    this.logger.logDebug({ message: 'Params validated', data: request });

    const { refreshToken } = request;

    const access = await this.usecase.execute({
      refreshToken,
    });

    const accessDTO = {
      accessToken: access.accessToken,
      refreshToken: access.refreshToken,
    };

    this.logger.logDebug({ message: 'Refresh token getted' });

    return accessDTO;
  }
}
