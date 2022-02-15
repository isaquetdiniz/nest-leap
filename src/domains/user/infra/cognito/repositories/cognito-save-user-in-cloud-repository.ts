import { ISaveUserInCloudRepository } from '@/domains/user';
import aws, { CognitoIdentityServiceProvider } from 'aws-sdk';

import cognitoEnvironment, { CognitoException } from '@/shared/infra/cognito';

export class CognitoSaveUserInCloudRepository
  implements ISaveUserInCloudRepository
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

  async save(
    userParams: ISaveUserInCloudRepository.Params
  ): Promise<ISaveUserInCloudRepository.Result> {
    const { email } = userParams;

    const attributes = [
      {
        Name: 'email',
        Value: email,
      },
      {
        Name: 'email_verified',
        Value: 'True',
      },
    ];

    return new Promise<ISaveUserInCloudRepository.Result>((resolve, reject) => {
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
            return reject(new CognitoException(err));
          }

          resolve();
        }
      );
    });
  }
}
