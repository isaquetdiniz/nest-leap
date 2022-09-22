import { CognitoGetRefreshTokenInCloudGateway } from '@/domains/auth/infra/cognito/gateways';
import { makeGetRefreshTokenValidation } from '@/domains/auth/interface/validation';
import { HttpGetRefreshTokenController } from '@/domains/auth/interface/http';

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
