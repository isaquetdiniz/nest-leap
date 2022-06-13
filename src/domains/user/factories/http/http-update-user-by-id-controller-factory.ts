import {
  PrismaUpdateUserRepository,
  PrismaGetUserByIdRepository,
} from '@/domains/user/infra/prisma/repositories';
import {
  HttpUpdateUserByIdController,
} from '@/domains/user/interface/http';
import {
  makeUpdateUserValidation,
} from '@/domains/user/interface/validation';

import { pinoLoggerLocal } from '@/shared/infra/logs';

export const makeHttpUpdateUserByIdController =
  (): HttpUpdateUserByIdController => {
    const getUserByIdRepository = new PrismaGetUserByIdRepository();
    const updateUserByIdRepository = new PrismaUpdateUserRepository();
    const validation = makeUpdateUserValidation();
    const logger = pinoLoggerLocal;

    return new HttpUpdateUserByIdController(
      getUserByIdRepository,
      updateUserByIdRepository,
      validation,
      logger
    );
  };
