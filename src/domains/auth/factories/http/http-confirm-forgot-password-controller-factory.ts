import {
  PrismaGetAuthUserByEmailRepository,
  CognitoGetAuthUserByEmailInCloudGateway,
  HttpConfirmForgotPasswordController,
  makeConfirmForgotPasswordValidation,
  CognitoConfirmForgotPasswordInCloudGateway,
} from '@/domains/auth';

export const makeHttpConfirmForgotPasswordController =
  (): HttpConfirmForgotPasswordController => {
    const getAuthUserByEmailRepository =
      new PrismaGetAuthUserByEmailRepository();
    const getAuthUserByEmailInCloudGateway =
      new CognitoGetAuthUserByEmailInCloudGateway();
    const confirmForgotPasswordInCloudGateway =
      new CognitoConfirmForgotPasswordInCloudGateway();
    const validation = makeConfirmForgotPasswordValidation();

    return new HttpConfirmForgotPasswordController(
      getAuthUserByEmailRepository,
      getAuthUserByEmailInCloudGateway,
      confirmForgotPasswordInCloudGateway,
      validation
    );
  };
