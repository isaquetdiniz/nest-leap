import aws, { CognitoIdentityServiceProvider } from 'aws-sdk';

import cognitoEnvironment, { CognitoException } from '@/shared/infra/cognito';
import { IGetAuthUserByEmailInCloudGateway } from '@/domains/auth/usecases/gateways';

export class CognitoGetAuthUserByEmailInCloudGateway
  implements IGetAuthUserByEmailInCloudGateway
{
  private readonly cognitoInstance: CognitoIdentityServiceProvider;

  constructor() {
    this.cognitoInstance = new aws.CognitoIdentityServiceProvider({
      apiVersion: cognitoEnvironment.apiVersion,
      region: cognitoEnvironment.region,
    });
  }

  async get(
    email: IGetAuthUserByEmailInCloudGateway.Params
  ): Promise<IGetAuthUserByEmailInCloudGateway.Result> {
    return new Promise((resolve, reject) => {
      this.cognitoInstance.adminGetUser(
        {
          Username: email,
          UserPoolId: cognitoEnvironment.userPoolId,
        },
        (err, data) => {
          if (err) {
            return reject(new CognitoException(err));
          }

          const { Username: username, UserStatus: status }: any = data;

          if (!data) {
            resolve(null);
          }

          const user = {
            status,
            email: username,
          };

          resolve(user);
        }
      );
    });
  }
}
