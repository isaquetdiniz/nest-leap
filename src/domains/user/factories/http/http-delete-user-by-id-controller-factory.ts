import {
  CognitoGetUserByEmailInCloudRepository,
  CognitoDeleteUserByEmailInCloudRepository,
  PrismaDeleteUserByIdRepository,
  HttpDeleteUserByIdController,
  PrismaGetUserByIdRepository,
  makeDeleteUserByIdValidation,
} from '@/domains/user';

export const makeHttpDeleteUserByIdController =
  (): HttpDeleteUserByIdController => {
    const getUserByIdRepository = new PrismaGetUserByIdRepository();
    const getUserByEmailInCloudRepository =
      new CognitoGetUserByEmailInCloudRepository();
    const deleteUserByEmailInCloudRepository =
      new CognitoDeleteUserByEmailInCloudRepository();
    const deleteUserByIdRepository = new PrismaDeleteUserByIdRepository();
    const validation = makeDeleteUserByIdValidation();

    return new HttpDeleteUserByIdController(
      getUserByIdRepository,
      getUserByEmailInCloudRepository,
      deleteUserByEmailInCloudRepository,
      deleteUserByIdRepository,
      validation
    );
  };
