import { PrismaGetUserByIdRepository } from '@/domains/user/infra/prisma/repositories';
import { CognitoGetUserByEmailInCloudRepository } from '@/domains/user/infra/cognito/repositories';
import { HttpGetUserByIdController } from '@/domains/user/interface/http';
import { makeGetUserByIdValidation } from '@/domains/user/interface/validation';

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
