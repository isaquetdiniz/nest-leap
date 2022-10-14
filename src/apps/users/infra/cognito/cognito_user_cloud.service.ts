import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import { IUserCloudService } from '@/users/application';
import { CognitoException } from '@/shared/infra';

export interface CognitoConfig {
  USER_POOL_ID: string;
}

@Injectable()
export class CognitoUserCloudService implements IUserCloudService {
  constructor(
    private readonly cognitoInstance: CognitoIdentityServiceProvider,
    private readonly cognitoConfig: CognitoConfig,
  ) {}

  async deleteByEmail(email: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.cognitoInstance.adminDeleteUser(
        {
          UserPoolId: this.cognitoConfig.USER_POOL_ID,
          Username: email,
        },
        (err) => {
          if (err) {
            return reject(new CognitoException(err));
          }

          resolve();
        },
      );
    });
  }

  async getByEmail(email: string): Promise<{ email: string; status: string }> {
    return new Promise((resolve, reject) => {
      this.cognitoInstance.adminGetUser(
        {
          Username: email,
          UserPoolId: this.cognitoConfig.USER_POOL_ID,
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
        },
      );
    });
  }

  async save(email: string): Promise<void> {
    const attributes = [
      {
        Name: 'email',
        Value: email,
      },
      {
        Name: 'email_verified',
        Value: 'True',
      },
    ];

    return new Promise<void>((resolve, reject) => {
      this.cognitoInstance.adminCreateUser(
        {
          Username: email,
          UserAttributes: attributes,
          UserPoolId: this.cognitoConfig.USER_POOL_ID,
          DesiredDeliveryMediums: ['EMAIL'],
          // MessageAction: 'SUPPRESS',
        },
        (err) => {
          if (err) {
            return reject(new CognitoException(err));
          }

          resolve();
        },
      );
    });
  }
}
