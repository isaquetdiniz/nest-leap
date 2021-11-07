import { LoadUserByTokenInCloudProviderError } from '@/application/errors/cloud/auth';
import { LoadUserByTokenInCloudProvider } from '@/application/protocols/cloud/auth';
import aws, { CognitoIdentityServiceProvider } from 'aws-sdk';

import cognitoEnvironment from './cognito-environment';

export class CognitoLoadUserByTokenInCloudProvider
  implements LoadUserByTokenInCloudProvider
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

  async loadUser(
    loadUserParams: LoadUserByTokenInCloudProvider.Params
  ): Promise<LoadUserByTokenInCloudProvider.Result> {
    const { token } = loadUserParams;

    return new Promise((resolve, reject) => {
      this.cognitoInstance.getUser(
        {
          AccessToken: token,
        },
        (err, data) => {
          if (err) {
            return reject(new LoadUserByTokenInCloudProviderError(err.message));
          }

          const { Username: username, UserAttributes: attributes }: any = data;

          const [emailAttribute] = attributes.filter(
            (attribute: any) => attribute.Name === 'email'
          );
          const email = emailAttribute.Value;

          resolve({ username, email });
        }
      );
    });
  }
}
