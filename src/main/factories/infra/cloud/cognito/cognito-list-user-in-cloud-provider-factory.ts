import { ListUserInCloudProvider } from '@/application/protocols/cloud/user';
import { CognitoListUsersInCloudProvider } from '@/infra/cloud/cognito';

export const makeCognitoListUserInCloudProvider =
  (): ListUserInCloudProvider => {
    return new CognitoListUsersInCloudProvider();
  };
