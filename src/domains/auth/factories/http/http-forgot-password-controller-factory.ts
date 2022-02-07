import {
  PrismaGetAuthUserByEmailRepository,
  CognitoGetAuthUserByEmailInCloudGateway,
  HttpForgotPasswordController,
  makeForgotPasswordValidation,
  CognitoForgotPasswordInCloudGateway,
} from '@/domains/auth';

export const makeHttpForgotPasswordController =
  (): HttpForgotPasswordController => {
    const getAuthUserByEmailRepository =
      new PrismaGetAuthUserByEmailRepository();
    const getAuthUserByEmailInCloudGateway =
      new CognitoGetAuthUserByEmailInCloudGateway();
    const forgotPasswordInCloudGateway =
      new CognitoForgotPasswordInCloudGateway();
    const validation = makeForgotPasswordValidation();

    return new HttpForgotPasswordController(
      getAuthUserByEmailRepository,
      getAuthUserByEmailInCloudGateway,
      forgotPasswordInCloudGateway,
      validation
    );
  };
