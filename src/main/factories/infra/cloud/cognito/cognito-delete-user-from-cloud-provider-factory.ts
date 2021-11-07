import { DeleteUserFromCloudProvider } from '@/application/protocols/cloud/user';
import { CognitoDeleteUserFromCloudProvider } from '@/infra/cloud/cognito';

export const makeCognitoDeleteUserFromCloudProvider =
  (): DeleteUserFromCloudProvider => {
    return new CognitoDeleteUserFromCloudProvider();
  };
