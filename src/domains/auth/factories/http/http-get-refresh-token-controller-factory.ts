import {
  HttpGetRefreshTokenController,
  makeGetRefreshTokenValidation,
  CognitoGetRefreshTokenInCloudGateway,
} from '@/domains/auth';
import { pinoLoggerLocal } from '@/shared/infra/logs';

export const makeHttpGetRefreshTokenController =
  (): HttpGetRefreshTokenController => {
    const getRefreshTokenInCloudGateway =
      new CognitoGetRefreshTokenInCloudGateway();
    const validation = makeGetRefreshTokenValidation();
    const loggerLocal = pinoLoggerLocal;

    return new HttpGetRefreshTokenController(
      getRefreshTokenInCloudGateway,
      validation,
      loggerLocal
    );
  };
