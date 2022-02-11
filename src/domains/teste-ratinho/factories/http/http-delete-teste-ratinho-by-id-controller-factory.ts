import {
  PrismaDeleteTesteRatinhoByIdRepository,
  HttpDeleteTesteRatinhoByIdController,
  PrismaGetTesteRatinhoByIdRepository,
  makeDeleteTesteRatinhoByIdValidation,
} from '@/domains/teste-ratinho';

import { pinoLoggerLocal } from '@/shared/infra/logs';

export const makeHttpDeleteTesteRatinhoByIdController =
  (): HttpDeleteTesteRatinhoByIdController => {
    const getTesteRatinhoByIdRepository =
      new PrismaGetTesteRatinhoByIdRepository();
    const deleteTesteRatinhoByIdRepository =
      new PrismaDeleteTesteRatinhoByIdRepository();
    const validation = makeDeleteTesteRatinhoByIdValidation();
    const logger = pinoLoggerLocal;

    return new HttpDeleteTesteRatinhoByIdController(
      getTesteRatinhoByIdRepository,
      deleteTesteRatinhoByIdRepository,
      validation,
      logger
    );
  };
