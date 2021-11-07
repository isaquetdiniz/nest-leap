import { ConfirmForgotPasswordInCloudProvider } from '@/application/protocols/cloud/auth';
import { CognitoConfirmForgotPasswordInCloudProvider } from '@/infra/cloud/cognito/cognito-confirm-forgot-password-in-cloud-provider';

export const makeCognitoConfirmForgotPasswordInCloudProvider =
  (): ConfirmForgotPasswordInCloudProvider => {
    return new CognitoConfirmForgotPasswordInCloudProvider();
  };
