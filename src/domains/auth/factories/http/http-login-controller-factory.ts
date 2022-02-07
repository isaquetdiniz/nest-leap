import {
  HttpLoginController,
  PrismaGetAuthUserByEmailRepository,
  makeLoginValidation,
  CognitoGetAuthUserByEmailInCloudGateway,
  CognitoLoginInCloudGateway,
} from '@/domains/auth';

export const makeHttpLoginController = (): HttpLoginController => {
  const getAuthUserByEmailRepository = new PrismaGetAuthUserByEmailRepository();
  const getAuthUserByEmailInCloudGateway =
    new CognitoGetAuthUserByEmailInCloudGateway();
  const loginInCloudGateway = new CognitoLoginInCloudGateway();
  const validation = makeLoginValidation();

  return new HttpLoginController(
    getAuthUserByEmailRepository,
    getAuthUserByEmailInCloudGateway,
    loginInCloudGateway,
    validation
  );
};
