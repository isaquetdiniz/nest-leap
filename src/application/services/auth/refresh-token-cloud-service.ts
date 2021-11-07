import { RefreshTokenInCloudProvider } from '@/application/protocols/cloud/auth';
import { RefreshTokenUsecase } from '@/application/usecases/auth';

type RefreshTokenCloudServiceInjectables = {
  refreshTokenInCloudProvider: RefreshTokenInCloudProvider;
};

class RefreshTokenCloudService implements RefreshTokenUsecase {
  private readonly refreshTokenInCloudProvider: RefreshTokenInCloudProvider;

  constructor({
    refreshTokenInCloudProvider,
  }: RefreshTokenCloudServiceInjectables) {
    this.refreshTokenInCloudProvider = refreshTokenInCloudProvider;
  }

  async refresh(
    refreshTokenParams: RefreshTokenUsecase.Params
  ): Promise<RefreshTokenUsecase.Result> {
    const { refreshToken } = refreshTokenParams;

    const { accessToken, refreshToken: newRefreshToken } =
      await this.refreshTokenInCloudProvider.refresh({ refreshToken });

    return { accessToken, refreshToken: newRefreshToken };
  }
}

export { RefreshTokenCloudService };
