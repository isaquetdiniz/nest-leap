import {
  HttpGetTesteRatinhosByFilterController,
  PrismaGetTesteRatinhosByFilterRepository,
  PrismaCountTesteRatinhosByFilterRepository,
  makeGetTesteRatinhosByFilterValidation,
} from '@/domains/teste-ratinho';

import { pinoLoggerLocal } from '@/shared/infra/logs';

export const makeHttpGetTesteRatinhosByFilterController =
  (): HttpGetTesteRatinhosByFilterController => {
    const getTesteRatinhosByFilterRepository =
      new PrismaGetTesteRatinhosByFilterRepository();
    const countTesteRatinhosByFilterRepository =
      new PrismaCountTesteRatinhosByFilterRepository();
    const validation = makeGetTesteRatinhosByFilterValidation();
    const logger = pinoLoggerLocal;

    return new HttpGetTesteRatinhosByFilterController(
      getTesteRatinhosByFilterRepository,
      countTesteRatinhosByFilterRepository,
      validation,
      logger
    );
  };
