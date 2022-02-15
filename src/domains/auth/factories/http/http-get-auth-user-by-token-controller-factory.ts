import {
  PrismaGetAuthUserByEmailRepository,
  HttpGetAuthUserByTokenController,
  makeGetAuthUserByTokenValidation,
  CognitoGetAuthUserByTokenInCloudGateway,
} from '@/domains/auth';
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
