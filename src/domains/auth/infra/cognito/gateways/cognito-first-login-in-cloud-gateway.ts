import aws, { CognitoIdentityServiceProvider } from 'aws-sdk';
import cognitoEnvironment, { CognitoException } from '@/shared/infra/cognito';
import { IFirstLoginInCloudGateway } from '@/domains/auth';

export class CognitoFirstLoginInCloudGateway
  implements IFirstLoginInCloudGateway
{
  private readonly cognitoInstance: CognitoIdentityServiceProvider;

  constructor() {
    this.cognitoInstance = new aws.CognitoIdentityServiceProvider({
      apiVersion: cognitoEnvironment.apiVersion,
      region: cognitoEnvironment.region,
    });
  }

  async login(
    loginParams: IFirstLoginInCloudGateway.Params
  ): Promise<IFirstLoginInCloudGateway.Result> {
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
            return reject(new CognitoException(err));
          }

          resolve(data.Session as string);
        }
      );
    });

    return new Promise<IFirstLoginInCloudGateway.Result>((resolve, reject) => {
      this.cognitoInstance.respondToAuthChallenge(
        {
          ChallengeName: 'NEW_PASSWORD_REQUIRED',
          ClientId: cognitoEnvironment.clientId,
          ChallengeResponses: challengeResponses,
          Session: session,
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
