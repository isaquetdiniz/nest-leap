import aws, { CognitoIdentityServiceProvider } from 'aws-sdk';

import { DeleteUserFromCloudProvider } from '@/application/protocols/cloud/user';

import cognitoEnvironment from './cognito-environment';
import { DeleteUserFromCloudProviderError } from '@/application/errors/cloud/user';

export class CognitoDeleteUserFromCloudProvider
  implements DeleteUserFromCloudProvider
{
  private readonly cognitoFromstance: CognitoIdentityServiceProvider;

  constructor() {
    this.cognitoFromstance = new aws.CognitoIdentityServiceProvider({
      apiVersion: cognitoEnvironment.apiVersion,
      region: cognitoEnvironment.region,
      credentials: new aws.Credentials({
        accessKeyId: cognitoEnvironment.accessKeyId,
        secretAccessKey: cognitoEnvironment.secretAccessKey,
      }),
    });
  }

  async deleteUser(
    userParams: DeleteUserFromCloudProvider.Params
  ): Promise<DeleteUserFromCloudProvider.Result> {
    const { email } = userParams;

    return new Promise<DeleteUserFromCloudProvider.Result>(
      (resolve, reject) => {
        this.cognitoFromstance.adminDeleteUser(
          {
            UserPoolId: cognitoEnvironment.userPoolId,
            Username: email,
          },
          (err, data) => {
            if (err) {
              return reject(new DeleteUserFromCloudProviderError(err.message));
            }

            resolve();
          }
        );
      }
    );
  }
}
