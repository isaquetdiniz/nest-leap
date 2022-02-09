import {
  PrismaGetAuthUserByEmailRepository,
  HttpGetAuthUserByTokenController,
  makeGetAuthUserByTokenValidation,
  CognitoGetAuthUserByTokenInCloudGateway,
} from '@/domains/auth';

export const makeHttpGetAuthUserByTokenController = (
  authUserRole: 'ADMIN' | 'USER' = 'USER'
): HttpGetAuthUserByTokenController => {
  const getAuthUserByEmailRepository = new PrismaGetAuthUserByEmailRepository();
  const getAuthUserByTokenInCloudGateway =
    new CognitoGetAuthUserByTokenInCloudGateway();
  const validation = makeGetAuthUserByTokenValidation();

  return new HttpGetAuthUserByTokenController(
    getAuthUserByTokenInCloudGateway,
    getAuthUserByEmailRepository,
    validation,
    authUserRole
  );
};
