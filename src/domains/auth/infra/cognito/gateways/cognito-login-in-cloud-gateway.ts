import aws, { CognitoIdentityServiceProvider } from 'aws-sdk';

import cognitoEnvironment, { CognitoException } from '@/shared/infra/cognito';
import { ILoginInCloudGateway } from '@/domains/auth/usecases/gateways';

export class CognitoLoginInCloudGateway implements ILoginInCloudGateway {
  private readonly cognitoInstance: CognitoIdentityServiceProvider;

  constructor() {
    this.cognitoInstance = new aws.CognitoIdentityServiceProvider({
      apiVersion: cognitoEnvironment.apiVersion,
      region: cognitoEnvironment.region,
    });
  }

  async login(
    loginParams: ILoginInCloudGateway.Params
  ): Promise<ILoginInCloudGateway.Result> {
    const { email, password } = loginParams;

    return new Promise<ILoginInCloudGateway.Result>((resolve, reject) => {
      this.cognitoInstance.initiateAuth(
        {
          AuthFlow: 'USER_PASSWORD_AUTH',
          ClientId: cognitoEnvironment.clientId,
          AuthParameters: {
            USERNAME: email,
            PASSWORD: password,
          },
        },
        (err, data) => {
          if (err) {
            return reject(new CognitoException(err));
          }

          if (!data.AuthenticationResult) {
            return reject(new CognitoException(err));
          }

          const { AccessToken: accessToken, RefreshToken: refreshToken }: any =
            data.AuthenticationResult;

          resolve({ accessToken, refreshToken });
        }
      );
    });
  }
}
