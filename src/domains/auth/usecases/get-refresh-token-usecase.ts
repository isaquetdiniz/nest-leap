import { Access, IGetRefreshTokenInCloudGateway } from '@/domains/auth';

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
  constructor(
    private readonly getRefreshTokenInCloudGateway: IGetRefreshTokenInCloudGateway
  ) {}

  async execute(
    params: IGetRefreshTokenUsecase.Params
  ): Promise<IGetRefreshTokenUsecase.Response> {
    const { refreshToken } = params;

    const { accessToken, refreshToken: newRefreshToken } =
      await this.getRefreshTokenInCloudGateway.get(refreshToken);

    const access = new Access({ accessToken, refreshToken: newRefreshToken });

    return access;
  }
}
