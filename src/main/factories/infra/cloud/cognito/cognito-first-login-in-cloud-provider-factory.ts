import { FirstLoginInCloudProvider } from '@/application/protocols/cloud/auth';
import { CognitoFirstLoginInCloudProvider } from '@/infra/cloud/cognito';

export const makeCognitoFirstLoginInCloudProvider =
  (): FirstLoginInCloudProvider => {
    return new CognitoFirstLoginInCloudProvider();
  };
