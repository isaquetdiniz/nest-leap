import { IGetAuthUserByTokenInCloudGateway } from '@/domains/auth';
import aws, { CognitoIdentityServiceProvider } from 'aws-sdk';

import cognitoEnvironment from '@/shared/infra/cognito';

export class CognitoGetAuthUserByTokenInCloudGateway
  implements IGetAuthUserByTokenInCloudGateway
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

  async get(
    token: IGetAuthUserByTokenInCloudGateway.Params
  ): Promise<IGetAuthUserByTokenInCloudGateway.Result> {
    return new Promise((resolve, reject) => {
      this.cognitoInstance.getUser(
        {
          AccessToken: token,
        },
        (err, data) => {
          if (err) {
            return reject(err);
          }

          const { UserAttributes: attributes }: any = data;

          const [emailAttribute] = attributes.filter(
            (attribute: any) => attribute.Name === 'email'
          );
          const email = emailAttribute.Value;

          resolve({ email });
        }
      );
    });
  }
}
