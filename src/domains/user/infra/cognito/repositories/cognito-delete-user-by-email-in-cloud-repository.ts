import { IDeleteUserByEmailInCloudRepository } from '@/domains/user/usecases/repos';
import aws, { CognitoIdentityServiceProvider } from 'aws-sdk';

import cognitoEnvironment, { CognitoException } from '@/shared/infra/cognito';

export class CognitoDeleteUserByEmailInCloudRepository
  implements IDeleteUserByEmailInCloudRepository {
  private readonly cognitoFromstance: CognitoIdentityServiceProvider;

  constructor() {
    this.cognitoFromstance = new aws.CognitoIdentityServiceProvider({
      apiVersion: cognitoEnvironment.apiVersion,
      region: cognitoEnvironment.region,
    });
  }

  async delete(
    email: IDeleteUserByEmailInCloudRepository.Params
  ): Promise<IDeleteUserByEmailInCloudRepository.Result> {
    return new Promise<IDeleteUserByEmailInCloudRepository.Result>(
      (resolve, reject) => {
        this.cognitoFromstance.adminDeleteUser(
          {
            UserPoolId: cognitoEnvironment.userPoolId,
            Username: email,
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
