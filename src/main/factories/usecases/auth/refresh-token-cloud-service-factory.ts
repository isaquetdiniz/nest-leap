import { RefreshTokenCloudService } from '@/application/services/auth';
import { RefreshTokenUsecase } from '@/domain/usecases/auth';
import { makeCognitoRefreshTokenInCloudProvider } from '@/main/factories/infra/cloud/cognito';

export const makeRefreshTokenCloudService = (): RefreshTokenUsecase => {
  const refreshTokenInCloudProvider = makeCognitoRefreshTokenInCloudProvider();

  return new RefreshTokenCloudService({
    refreshTokenInCloudProvider,
  });
};
