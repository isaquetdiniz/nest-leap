import { CreateUserInCloudProvider } from '@/application/protocols/cloud/user';
import { CognitoCreateUserCloudProvider } from '@/infra/cloud/cognito';

export const makeCognitoCreateUserInCloudProvider =
  (): CreateUserInCloudProvider => {
    return new CognitoCreateUserCloudProvider();
  };
