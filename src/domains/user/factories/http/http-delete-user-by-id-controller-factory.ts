import {
  CognitoGetUserByEmailInCloudRepository,
  CognitoDeleteUserByEmailInCloudRepository,
  PrismaDeleteUserByIdRepository,
  HttpDeleteUserByIdController,
  PrismaGetUserByIdRepository,
  makeDeleteUserByIdValidation,
} from '@/domains/user';
import { pinoLoggerLocal } from '@/shared/infra/logs';

export const makeHttpDeleteUserByIdController =
  (): HttpDeleteUserByIdController => {
    const getUserByIdRepository = new PrismaGetUserByIdRepository();
    const getUserByEmailInCloudRepository =
      new CognitoGetUserByEmailInCloudRepository();
    const deleteUserByEmailInCloudRepository =
      new CognitoDeleteUserByEmailInCloudRepository();
    const deleteUserByIdRepository = new PrismaDeleteUserByIdRepository();
    const validation = makeDeleteUserByIdValidation();
    const logger = pinoLoggerLocal;

    return new HttpDeleteUserByIdController(
      getUserByIdRepository,
      getUserByEmailInCloudRepository,
      deleteUserByEmailInCloudRepository,
      deleteUserByIdRepository,
      validation,
      logger
    );
  };
