import {
  HttpGetTesteRatinhoByIdController,
  PrismaGetTesteRatinhoByIdRepository,
  makeGetTesteRatinhoByIdValidation,
} from '@/domains/teste-ratinho';

import { pinoLoggerLocal } from '@/shared/infra/logs';

export const makeHttpGetTesteRatinhoByIdController =
  (): HttpGetTesteRatinhoByIdController => {
    const getTesteRatinhoByIdRepository =
      new PrismaGetTesteRatinhoByIdRepository();
    const validation = makeGetTesteRatinhoByIdValidation();
    const logger = pinoLoggerLocal;

    return new HttpGetTesteRatinhoByIdController(
      getTesteRatinhoByIdRepository,
      validation,
      logger
    );
  };
