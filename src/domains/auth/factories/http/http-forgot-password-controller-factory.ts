import {
  PrismaGetAuthUserByEmailRepository,
  CognitoGetAuthUserByEmailInCloudGateway,
  HttpForgotPasswordController,
  makeForgotPasswordValidation,
  CognitoForgotPasswordInCloudGateway,
} from '@/domains/auth';
import { pinoLoggerLocal } from '@/shared/infra/logs';

export const makeHttpForgotPasswordController =
  (): HttpForgotPasswordController => {
    const getAuthUserByEmailRepository =
      new PrismaGetAuthUserByEmailRepository();
    const getAuthUserByEmailInCloudGateway =
      new CognitoGetAuthUserByEmailInCloudGateway();
    const forgotPasswordInCloudGateway =
      new CognitoForgotPasswordInCloudGateway();
    const validation = makeForgotPasswordValidation();
    const logger = pinoLoggerLocal;

    return new HttpForgotPasswordController(
      getAuthUserByEmailRepository,
      getAuthUserByEmailInCloudGateway,
      forgotPasswordInCloudGateway,
      validation,
      logger
    );
  };
