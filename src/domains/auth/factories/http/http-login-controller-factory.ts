import {
  HttpLoginController,
  PrismaGetAuthUserByEmailRepository,
  makeLoginValidation,
  CognitoGetAuthUserByEmailInCloudGateway,
  CognitoLoginInCloudGateway,
} from '@/domains/auth';
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
