import { RefreshTokenInCloudProvider } from '@/application/protocols/cloud/auth';
import { CognitoRefreshTokenInCloudProvider } from '@/infra/cloud/cognito';

export const makeCognitoRefreshTokenInCloudProvider =
  (): RefreshTokenInCloudProvider => {
    return new CognitoRefreshTokenInCloudProvider();
  };
