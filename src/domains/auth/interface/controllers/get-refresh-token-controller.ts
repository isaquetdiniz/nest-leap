import { Validation } from '@/shared/interface/validation/protocols';
import { ValidationException } from '@/shared/helpers';

import {
  AccessDTO,
  IGetRefreshTokenInCloudGateway,
  GetRefreshTokenUsecase,
} from '@/domains/auth';

export interface GetRefreshTokenRequest {
  refreshToken: string;
}

export type GetRefreshTokenResponse = AccessDTO;

export class GetRefreshTokenController {
  private usecase: GetRefreshTokenUsecase;

  constructor(
    getRefreshTokenInCloudGateway: IGetRefreshTokenInCloudGateway,
    private readonly validation: Validation
  ) {
    this.usecase = new GetRefreshTokenUsecase(getRefreshTokenInCloudGateway);
  }

  async execute(
    request: GetRefreshTokenRequest
  ): Promise<GetRefreshTokenResponse> {
    const hasError = this.validation.validate(request);

    if (hasError) {
      throw new ValidationException(hasError);
    }

    const { refreshToken } = request;

    const access = await this.usecase.execute({
      refreshToken,
    });

    const accessDTO = {
      accessToken: access.accessToken,
      refreshToken: access.refreshToken,
    };

    return accessDTO;
  }
}
