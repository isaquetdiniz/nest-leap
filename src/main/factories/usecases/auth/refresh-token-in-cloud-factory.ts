import { RefreshTokenInCloudUsecase } from '@/domain/auth';
import { RefreshTokenInCloud } from '@/domain/auth/refresh-token-in-cloud/refresh-token-in-cloud-in-cloud';
import { makeCognitoRefreshTokenInCloudProvider } from '@/main/factories/infra/cloud/cognito';

export const makeRefreshTokenInCloudUsecase =
  (): RefreshTokenInCloudUsecase => {
    const getRefreshTokenInCloudProvider =
      makeCognitoRefreshTokenInCloudProvider();

    return new RefreshTokenInCloud({
      getRefreshTokenInCloudProvider,
    });
  };
