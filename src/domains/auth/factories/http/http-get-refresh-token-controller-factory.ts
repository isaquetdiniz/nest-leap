import {
  HttpGetRefreshTokenController,
  makeGetRefreshTokenValidation,
  CognitoGetRefreshTokenInCloudGateway,
} from '@/domains/auth';

export const makeHttpGetRefreshTokenController =
  (): HttpGetRefreshTokenController => {
    const getRefreshTokenInCloudGateway =
      new CognitoGetRefreshTokenInCloudGateway();
    const validation = makeGetRefreshTokenValidation();

    return new HttpGetRefreshTokenController(
      getRefreshTokenInCloudGateway,
      validation
    );
  };
