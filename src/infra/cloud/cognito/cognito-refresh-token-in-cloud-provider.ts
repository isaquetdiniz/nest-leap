import aws, { CognitoIdentityServiceProvider } from 'aws-sdk';

import { RefreshTokenInCloudProvider } from '@/application/protocols/cloud/auth';

import cognitoEnvironment from './cognito-environment';
import { RefreshTokenInCloudProviderError } from '@/application/errors/cloud/auth';

export class CognitoRefreshTokenInCloudProvider
  implements RefreshTokenInCloudProvider
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

  async refresh(
    refreshParams: RefreshTokenInCloudProvider.Params
  ): Promise<RefreshTokenInCloudProvider.Result> {
    const { refreshToken } = refreshParams;

    return new Promise<RefreshTokenInCloudProvider.Result>(
      (resolve, reject) => {
        this.cognitoInstance.initiateAuth(
          {
            AuthFlow: 'REFRESH_TOKEN',
            ClientId: cognitoEnvironment.clientId,
            AuthParameters: {
              REFRESH_TOKEN: refreshToken,
            },
          },
          (err, data) => {
            if (err) {
              return reject(new RefreshTokenInCloudProviderError(err.message));
            }

            if (!data.AuthenticationResult) {
              return reject(
                new RefreshTokenInCloudProviderError('Error with Refresh')
              );
            }

            const {
              AccessToken: accessToken,
              RefreshToken: refreshToken,
            }: any = data.AuthenticationResult;

            resolve({ accessToken, refreshToken });
          }
        );
      }
    );
  }
}
