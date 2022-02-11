import {
  PrismaGetAuthUserByEmailRepository,
  CognitoGetAuthUserByEmailInCloudGateway,
  HttpConfirmForgotPasswordController,
  makeConfirmForgotPasswordValidation,
  CognitoConfirmForgotPasswordInCloudGateway,
} from '@/domains/auth';
import { pinoLoggerLocal } from '@/shared/infra/logs';

export const makeHttpConfirmForgotPasswordController =
  (): HttpConfirmForgotPasswordController => {
    const getAuthUserByEmailRepository =
      new PrismaGetAuthUserByEmailRepository();
    const getAuthUserByEmailInCloudGateway =
      new CognitoGetAuthUserByEmailInCloudGateway();
    const confirmForgotPasswordInCloudGateway =
      new CognitoConfirmForgotPasswordInCloudGateway();
    const validation = makeConfirmForgotPasswordValidation();
    const loggerLocal = pinoLoggerLocal;

    return new HttpConfirmForgotPasswordController(
      getAuthUserByEmailRepository,
      getAuthUserByEmailInCloudGateway,
      confirmForgotPasswordInCloudGateway,
      validation,
      loggerLocal
    );
  };
