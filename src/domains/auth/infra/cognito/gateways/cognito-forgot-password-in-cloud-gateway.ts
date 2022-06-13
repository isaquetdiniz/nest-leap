import aws, { CognitoIdentityServiceProvider } from 'aws-sdk';

import cognitoEnvironment, { CognitoException } from '@/shared/infra/cognito';
import { IForgotPasswordInCloudGateway } from '@/domains/auth/usecases/gateways';

export class CognitoForgotPasswordInCloudGateway
  implements IForgotPasswordInCloudGateway
{
  private readonly cognitoInstance: CognitoIdentityServiceProvider;

  constructor() {
    this.cognitoInstance = new aws.CognitoIdentityServiceProvider({
      apiVersion: cognitoEnvironment.apiVersion,
      region: cognitoEnvironment.region,
    });
  }

  async forgot(
    forgotParams: IForgotPasswordInCloudGateway.Params
  ): Promise<IForgotPasswordInCloudGateway.Result> {
    const { email } = forgotParams;

    return new Promise((resolve, reject) => {
      this.cognitoInstance.forgotPassword(
        {
          ClientId: cognitoEnvironment.clientId,
          Username: email,
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
