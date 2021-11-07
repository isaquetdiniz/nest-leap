import aws, { CognitoIdentityServiceProvider } from 'aws-sdk';

import { FirstLoginInCloudProvider } from '@/application/protocols/cloud/auth';

import cognitoEnvironment from './cognito-environment';
import { FirstLoginInCloudProviderError } from '@/application/errors/cloud/auth';

export class CognitoFirstLoginInCloudProvider
  implements FirstLoginInCloudProvider
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

  async firstLogin(
    loginParams: FirstLoginInCloudProvider.Params
  ): Promise<FirstLoginInCloudProvider.Result> {
    const { email, newPassword, temporaryPassword } = loginParams;

    const challengeResponses = {
      NEW_PASSWORD: newPassword,
      USERNAME: email,
    };

    const session = await new Promise<string>((resolve, reject) => {
      this.cognitoInstance.initiateAuth(
        {
          AuthFlow: 'USER_PASSWORD_AUTH',
          ClientId: cognitoEnvironment.clientId,
          AuthParameters: {
            USERNAME: email,
            PASSWORD: temporaryPassword,
          },
        },
        (err, data) => {
          if (err) {
            reject(err);
          }

          resolve(data.Session as string);
        }
      );
    });

    return new Promise<FirstLoginInCloudProvider.Result>((resolve, reject) => {
      this.cognitoInstance.respondToAuthChallenge(
        {
          ChallengeName: 'NEW_PASSWORD_REQUIRED',
          ClientId: cognitoEnvironment.clientId,
          ChallengeResponses: challengeResponses,
          Session: session,
        },
        (err, data) => {
          if (err) {
            return reject(new FirstLoginInCloudProviderError(err.message));
          }

          resolve();
        }
      );
    });
  }
}
