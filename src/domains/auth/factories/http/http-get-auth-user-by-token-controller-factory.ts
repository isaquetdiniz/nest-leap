import {
  PrismaGetAuthUserByEmailRepository,
  HttpGetAuthUserByTokenController,
  makeGetAuthUserByTokenValidation,
  CognitoGetAuthUserByEmailInCloudGateway,
} from '@/domains/auth';

export const makeHttpGetAuthByTokenController =
  (): HttpGetAuthUserByTokenController => {
    const getAuthUserByEmailRepository =
      new PrismaGetAuthUserByEmailRepository();
    const getAuthUserByEmailInCloudGateway =
      new CognitoGetAuthUserByEmailInCloudGateway();
    const validation = makeGetAuthUserByTokenValidation();

    return new HttpGetAuthUserByTokenController(
      getAuthUserByEmailInCloudGateway,
      getAuthUserByEmailRepository,
      validation
    );
  };
