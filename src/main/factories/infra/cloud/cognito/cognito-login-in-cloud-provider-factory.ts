import { LoginInCloudProvider } from '@/application/protocols/cloud/auth';
import { CognitoLoginInCloudProvider } from '@/infra/cloud/cognito';

export const makeCognitoLoginInCloudProvider = (): LoginInCloudProvider => {
  return new CognitoLoginInCloudProvider();
};
