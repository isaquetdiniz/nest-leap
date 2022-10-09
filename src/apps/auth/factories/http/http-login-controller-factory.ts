import { PrismaGetAuthUserByEmailRepository } from '@/domains/auth/infra/prisma/repositories';
import {
  CognitoLoginInCloudGateway,
  CognitoGetAuthUserByEmailInCloudGateway,
} from '@/domains/auth/infra/cognito/gateways';
import { makeLoginValidation } from '@/domains/auth/interface/validation';
import { HttpLoginController } from '@/domains/auth/interface/http';

import { pinoLoggerLocal } from '@/shared/infra/logs';

export const makeHttpLoginController = (): HttpLoginController => {
  const getAuthUserByEmailRepository = new PrismaGetAuthUserByEmailRepository();
  const getAuthUserByEmailInCloudGateway =
    new CognitoGetAuthUserByEmailInCloudGateway();
  const loginInCloudGateway = new CognitoLoginInCloudGateway();
  const validation = makeLoginValidation();
  const loggerLocal = pinoLoggerLocal;

  return new HttpLoginController(
    getAuthUserByEmailRepository,
    getAuthUserByEmailInCloudGateway,
    loginInCloudGateway,
    validation,
    loggerLocal
  );
};
