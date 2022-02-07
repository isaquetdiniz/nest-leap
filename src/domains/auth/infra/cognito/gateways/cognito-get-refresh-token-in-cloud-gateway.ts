import aws, { CognitoIdentityServiceProvider } from 'aws-sdk';

import cognitoEnvironment from '@/shared/infra/cognito';

import { IGetRefreshTokenInCloudGateway } from '@/domains/auth';

export class CognitoGetRefreshTokenInCloudGateway
  implements IGetRefreshTokenInCloudGateway
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
    refreshToken: IGetRefreshTokenInCloudGateway.Params
  ): Promise<IGetRefreshTokenInCloudGateway.Result> {
    return new Promise<IGetRefreshTokenInCloudGateway.Result>(
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
              return reject(err);
            }

            if (!data.AuthenticationResult) {
              return reject(new Error('Error with Refresh'));
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
