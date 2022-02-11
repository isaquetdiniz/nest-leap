import {
  PrismaGetAuthUserByEmailRepository,
  CognitoGetAuthUserByEmailInCloudGateway,
  CognitoLoginInCloudGateway,
  HttpFirstLoginController,
  CognitoFirstLoginInCloudGateway,
  makeFirstLoginValidation,
} from '@/domains/auth';
import { pinoLoggerLocal } from '@/shared/infra/logs';

export const makeHttpFirstLoginController = (): HttpFirstLoginController => {
  const getAuthUserByEmailRepository = new PrismaGetAuthUserByEmailRepository();
  const getAuthUserByEmailInCloudGateway =
    new CognitoGetAuthUserByEmailInCloudGateway();
  const firstLoginInCloudGateway = new CognitoFirstLoginInCloudGateway();
  const loginInCloudGateway = new CognitoLoginInCloudGateway();
  const validation = makeFirstLoginValidation();
  const loggerLocal = pinoLoggerLocal;

  return new HttpFirstLoginController(
    getAuthUserByEmailRepository,
    getAuthUserByEmailInCloudGateway,
    firstLoginInCloudGateway,
    loginInCloudGateway,
    validation,
    loggerLocal
  );
};
