import aws, { CognitoIdentityServiceProvider } from 'aws-sdk';

import { LoginInCloudProvider } from '@/application/protocols/cloud/auth';

import cognitoEnvironment from './cognito-environment';
import { LoginInCloudProviderError } from '@/application/errors/cloud/auth';

export class CognitoLoginInCloudProvider implements LoginInCloudProvider {
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

  async login(
    loginParams: LoginInCloudProvider.Params
  ): Promise<LoginInCloudProvider.Result> {
    const { email, password } = loginParams;

    return new Promise<LoginInCloudProvider.Result>((resolve, reject) => {
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
            return reject(new LoginInCloudProviderError(err.message));
          }

          if (!data.AuthenticationResult) {
            return reject(new LoginInCloudProviderError('Error with login'));
          }

          const { AccessToken: accessToken, RefreshToken: refreshToken }: any =
            data.AuthenticationResult;

          resolve({ accessToken, refreshToken });
        }
      );
    });
  }
}
