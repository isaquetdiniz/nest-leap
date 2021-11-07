import { CreateUserInCloudProvider } from '@/application/protocols/cloud/user';
import { CognitoCreateUserInCloudProvider } from '@/infra/cloud/cognito';

export const makeCognitoCreateUserInCloudProvider =
  (): CreateUserInCloudProvider => {
    return new CognitoCreateUserInCloudProvider();
  };
