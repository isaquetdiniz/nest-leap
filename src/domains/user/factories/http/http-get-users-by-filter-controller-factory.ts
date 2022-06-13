import {
  PrismaGetUsersByFilterRepository,
  PrismaCountUsersByFilterRepository,
} from '@/domains/user/infra/prisma/repositories';
import {
  HttpGetUsersByFilterController,
} from '@/domains/user/interface/http';
import {
  makeGetUsersByFilterValidation,
} from '@/domains/user/interface/validation';

import { pinoLoggerLocal } from '@/shared/infra/logs';

export const makeHttpGetUsersByFilterController =
  (): HttpGetUsersByFilterController => {
    const getUsersByFilterRepository = new PrismaGetUsersByFilterRepository();
    const countUsersByFilterRepository =
      new PrismaCountUsersByFilterRepository();
    const validation = makeGetUsersByFilterValidation();
    const logger = pinoLoggerLocal;

    return new HttpGetUsersByFilterController(
      getUsersByFilterRepository,
      countUsersByFilterRepository,
      validation,
      logger
    );
  };
