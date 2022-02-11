import {
  HttpCreateTesteRatinhoController,
  PrismaGetTesteRatinhoByNameRepository,
  PrismaSaveTesteRatinhoRepository,
  makeCreateTesteRatinhoValidation,
} from '@/domains/teste-ratinho';

import { pinoLoggerLocal } from '@/shared/infra/logs';

import { UUIDGeneratorAdapter } from '@/shared/infra/uuid';

export const makeHttpCreateTesteRatinhoController =
  (): HttpCreateTesteRatinhoController => {
    const getTesteRatinhoByNameRepository =
      new PrismaGetTesteRatinhoByNameRepository();
    const uuidGenerator = new UUIDGeneratorAdapter();
    const saveTesteRatinhoRepository = new PrismaSaveTesteRatinhoRepository();
    const validation = makeCreateTesteRatinhoValidation();
    const logger = pinoLoggerLocal;

    return new HttpCreateTesteRatinhoController(
      getTesteRatinhoByNameRepository,
      uuidGenerator,
      saveTesteRatinhoRepository,
      validation,
      logger
    );
  };
