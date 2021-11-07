import { ListUserInCloudProviderError } from '@/application/errors/cloud/user';
import { ListUserInCloudProvider } from '@/application/protocols/cloud/user';
import aws, { CognitoIdentityServiceProvider } from 'aws-sdk';

import cognitoEnvironment from './cognito-environment';

export class CognitoListUsersInCloudProvider
  implements ListUserInCloudProvider
{
  private readonly cognitoInstance: CognitoIdentityServiceProvider;

  constructor() {
    this.cognitoInstance = new aws.CognitoIdentityServiceProvider({
      apiVersion: cognitoEnvironment.apiVersion,
      region: cognitoEnvironment.region,
      credentials: new aws.Credentials({
        accessKeyId: cognitoEnvironment.accessKeyId,
        secretAccessKey: cognitoEnvironment.secretAccessKey,
      }),
    });
  }

  async listUser(
    userParams: ListUserInCloudProvider.Params
  ): Promise<ListUserInCloudProvider.Result> {
    const { email } = userParams;

    return new Promise((resolve, reject) => {
      this.cognitoInstance.adminGetUser(
        {
          Username: email,
          UserPoolId: cognitoEnvironment.userPoolId,
        },
        (err, data) => {
          if (err) {
            return reject(new ListUserInCloudProviderError(err.message));
          }

          const {
            Username: username,
            Enabled: enabled,
            UserStatus: status,
          }: any = data;

          resolve({ username, email, enabled, status });
        }
      );
    });
  }
}
