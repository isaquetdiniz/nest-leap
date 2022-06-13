import {
  PrismaGetAuthUserByEmailRepository,
} from '@/domains/auth/infra/prisma/repositories';
import {
  CognitoForgotPasswordInCloudGateway,
  CognitoGetAuthUserByEmailInCloudGateway,
} from '@/domains/auth/infra/cognito/gateways';
import {
  makeForgotPasswordValidation,
} from '@/domains/auth/interface/validation';
import {
  HttpForgotPasswordController,
} from '@/domains/auth/interface/http';

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
