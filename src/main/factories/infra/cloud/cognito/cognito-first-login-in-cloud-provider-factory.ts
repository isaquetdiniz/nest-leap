import { FirstLoginInCloudProvider } from '@/domain/auth/first-login-in-cloud/protocols';
import { CognitoFirstLoginInCloudProvider } from '@/infra/cloud/cognito';

export const makeCognitoFirstLoginInCloudProvider =
  (): FirstLoginInCloudProvider => {
    return new CognitoFirstLoginInCloudProvider();
  };
