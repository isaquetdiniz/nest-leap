import {
  Access,
} from '@/domains/auth/entities';
import{
  IGetRefreshTokenInCloudGateway
} from '@/domains/auth/usecases/gateways';

import { ILoggerLocal } from '@/shared/protocols';

export interface IGetRefreshTokenUsecase {
  execute(
    params: IGetRefreshTokenUsecase.Params
  ): Promise<IGetRefreshTokenUsecase.Response>;
}

export namespace IGetRefreshTokenUsecase {
  export type Params = { refreshToken: string };
  export type Response = Access;
}

export class GetRefreshTokenUsecase implements IGetRefreshTokenUsecase {
  private readonly logger: ILoggerLocal;

  constructor(
    private readonly getRefreshTokenInCloudGateway: IGetRefreshTokenInCloudGateway,
    logger: ILoggerLocal
  ) {
    this.logger = logger.child({ usecase: 'get-refresh-token' });
  }

  async execute(
    params: IGetRefreshTokenUsecase.Params
  ): Promise<IGetRefreshTokenUsecase.Response> {
    this.logger.logDebug({ message: 'Request Received', data: params });

    const { refreshToken } = params;

    const { accessToken, refreshToken: newRefreshToken } =
      await this.getRefreshTokenInCloudGateway.get(refreshToken);

    const access = new Access({ accessToken, refreshToken: newRefreshToken });

    this.logger.logDebug({ message: 'Refresh Token getted', data: access });

    return access;
  }
}
