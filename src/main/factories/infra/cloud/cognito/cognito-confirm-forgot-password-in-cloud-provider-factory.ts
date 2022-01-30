import { ConfirmForgotPasswordInCloudProvider } from '@/domain/auth/usecases/confirm-forgot-password-in-cloud/protocols';
import { CognitoConfirmForgotPasswordInCloudProvider } from '@/infra/cloud/cognito/cognito-confirm-forgot-password-in-cloud-provider';

export const makeCognitoConfirmForgotPasswordInCloudProvider =
  (): ConfirmForgotPasswordInCloudProvider => {
    return new CognitoConfirmForgotPasswordInCloudProvider();
  };
