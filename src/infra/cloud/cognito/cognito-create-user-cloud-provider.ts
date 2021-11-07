import aws, { CognitoIdentityServiceProvider } from 'aws-sdk';

import { CreateUserInCloudProvider } from '@/application/protocols/cloud/user';

import cognitoEnvironment from './cognito-environment';

export class CognitoCreateUserCloudProvider
  implements CreateUserInCloudProvider
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

  async createUser(
    userParams: CreateUserInCloudProvider.Params
  ): Promise<CreateUserInCloudProvider.Result> {
    const { email } = userParams;

    const attributes = [
      {
        Name: 'email',
        Value: email,
      },
    ];

    return new Promise<CreateUserInCloudProvider.Result>((resolve, reject) => {
      this.cognitoInstance.adminCreateUser(
        {
          Username: email,
          UserAttributes: attributes,
          UserPoolId: cognitoEnvironment.userPoolId,
          DesiredDeliveryMediums: ['EMAIL'],
          // MessageAction: 'SUPPRESS',
        },
        (err, data) => {
          if (err) {
            reject(err);
          }

          resolve();
        }
      );
    });
  }
}
