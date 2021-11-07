import { LoadUserByTokenInCloudProvider } from '@/application/protocols/cloud/auth';
import { CognitoLoadUserByTokenInCloudProvider } from '@/infra/cloud/cognito';

export const makeCognitLoadUserByTokenInCloudProvider =
  (): LoadUserByTokenInCloudProvider => {
    return new CognitoLoadUserByTokenInCloudProvider();
  };
