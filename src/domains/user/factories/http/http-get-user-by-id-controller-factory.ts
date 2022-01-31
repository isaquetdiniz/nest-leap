import {
  HttpGetUserByIdController,
  PrismaGetUserByIdRepository,
  CognitoGetUserByEmailInCloudRepository,
  makeGetUserByIdValidation,
} from '@/domains/user';

export const makeHttpGetUserByIdController = (): HttpGetUserByIdController => {
  const getUserByIdRepository = new PrismaGetUserByIdRepository();
  const getUserByEmailInCloudRepository =
    new CognitoGetUserByEmailInCloudRepository();
  const validation = makeGetUserByIdValidation();

  return new HttpGetUserByIdController(
    getUserByIdRepository,
    getUserByEmailInCloudRepository,
    validation
  );
};
