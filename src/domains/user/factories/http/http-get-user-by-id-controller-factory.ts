import {
  HttpGetUserByIdController,
  PrismaGetUserByIdRepository,
  CognitoGetUserByEmailInCloudRepository,
  makeGetUserByIdValidation,
} from '@/domains/user';
import { pinoLoggerLocal } from '@/shared/infra/logs';

export const makeHttpGetUserByIdController = (): HttpGetUserByIdController => {
  const getUserByIdRepository = new PrismaGetUserByIdRepository();
  const getUserByEmailInCloudRepository =
    new CognitoGetUserByEmailInCloudRepository();
  const validation = makeGetUserByIdValidation();
  const logger = pinoLoggerLocal;

  return new HttpGetUserByIdController(
    getUserByIdRepository,
    getUserByEmailInCloudRepository,
    validation,
    logger
  );
};
