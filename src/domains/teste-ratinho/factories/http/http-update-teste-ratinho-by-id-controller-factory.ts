import {
  PrismaGetTesteRatinhoByIdRepository,
  HttpUpdateTesteRatinhoByIdController,
  makeUpdateTesteRatinhoValidation,
  PrismaUpdateTesteRatinhoRepository,
} from '@/domains/teste-ratinho';

import { pinoLoggerLocal } from '@/shared/infra/logs';

export const makeHttpUpdateTesteRatinhoByIdController =
  (): HttpUpdateTesteRatinhoByIdController => {
    const getTesteRatinhoByIdRepository =
      new PrismaGetTesteRatinhoByIdRepository();
    const updateTesteRatinhoByIdRepository =
      new PrismaUpdateTesteRatinhoRepository();
    const validation = makeUpdateTesteRatinhoValidation();
    const logger = pinoLoggerLocal;

    return new HttpUpdateTesteRatinhoByIdController(
      getTesteRatinhoByIdRepository,
      updateTesteRatinhoByIdRepository,
      validation,
      logger
    );
  };
