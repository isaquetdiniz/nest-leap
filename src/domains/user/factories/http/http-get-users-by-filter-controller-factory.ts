import {
  HttpGetUsersByFilterController,
  PrismaGetUsersByFilterRepository,
  PrismaCountUsersByFilterRepository,
  makeGetUsersByFilterValidation,
} from '@/domains/user';
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
