import aws, { CognitoIdentityServiceProvider } from 'aws-sdk';

import cognitoEnvironment, { CognitoException } from '@/shared/infra/cognito';

import { IGetRefreshTokenInCloudGateway } from '@/domains/auth/usecases/gateways';

export class CognitoGetRefreshTokenInCloudGateway
  implements IGetRefreshTokenInCloudGateway
{
  private readonly cognitoInstance: CognitoIdentityServiceProvider;

  constructor() {
    this.cognitoInstance = new aws.CognitoIdentityServiceProvider({
      apiVersion: cognitoEnvironment.apiVersion,
      region: cognitoEnvironment.region,
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
              return reject(new CognitoException(err));
            }

            if (!data.AuthenticationResult) {
              return reject(new CognitoException(err));
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
