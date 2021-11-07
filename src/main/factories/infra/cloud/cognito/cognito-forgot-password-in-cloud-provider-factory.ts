import { ForgotPasswordInCloudProvider } from '@/application/protocols/cloud/auth';
import { CognitoForgotPasswordInCloudProvider } from '@/infra/cloud/cognito';

export const makeCognitoForgotPasswordInCloudProvider =
  (): ForgotPasswordInCloudProvider => {
    return new CognitoForgotPasswordInCloudProvider();
  };
