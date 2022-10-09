import { PrismaGetAuthUserByEmailRepository } from '@/domains/auth/infra/prisma/repositories';
import { CognitoGetAuthUserByTokenInCloudGateway } from '@/domains/auth/infra/cognito/gateways';
import { makeGetAuthUserByTokenValidation } from '@/domains/auth/interface/validation';
import { HttpGetAuthUserByTokenController } from '@/domains/auth/interface/http';

import { pinoLoggerLocal } from '@/shared/infra/logs';

export const makeHttpGetAuthUserByTokenController = (
  authUserRole: 'ADMIN' | 'USER' = 'USER'
): HttpGetAuthUserByTokenController => {
  const getAuthUserByEmailRepository = new PrismaGetAuthUserByEmailRepository();
  const getAuthUserByTokenInCloudGateway =
    new CognitoGetAuthUserByTokenInCloudGateway();
  const validation = makeGetAuthUserByTokenValidation();
  const loggerLocal = pinoLoggerLocal;

  return new HttpGetAuthUserByTokenController(
    getAuthUserByTokenInCloudGateway,
    getAuthUserByEmailRepository,
    validation,
    authUserRole,
    loggerLocal
  );
};
