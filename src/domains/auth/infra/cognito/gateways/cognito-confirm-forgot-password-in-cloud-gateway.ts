import aws, { CognitoIdentityServiceProvider } from 'aws-sdk';

import cognitoEnvironment, { CognitoException } from '@/shared/infra/cognito';

import { IConfirmForgotPasswordInCloudGateway } from '@/domains/auth';

export class CognitoConfirmForgotPasswordInCloudGateway
  implements IConfirmForgotPasswordInCloudGateway
{
  private readonly cognitoInstance: CognitoIdentityServiceProvider;

  constructor() {
    this.cognitoInstance = new aws.CognitoIdentityServiceProvider({
      apiVersion: cognitoEnvironment.apiVersion,
      region: cognitoEnvironment.region,
    });
  }

  async confirm(
    confirmParams: IConfirmForgotPasswordInCloudGateway.Params
  ): Promise<IConfirmForgotPasswordInCloudGateway.Result> {
    const { email, newPassword, verificationCode } = confirmParams;

    return new Promise<IConfirmForgotPasswordInCloudGateway.Result>(
      (resolve, reject) => {
        this.cognitoInstance.confirmForgotPassword(
          {
            ClientId: cognitoEnvironment.clientId,
            Username: email,
            Password: newPassword,
            ConfirmationCode: verificationCode,
          },
          (err, data) => {
            if (err) {
              return reject(new CognitoException(err));
            }

            resolve();
          }
        );
      }
    );
  }
}
