import {
  PrismaGetTesteRatinhoByIdRepository,
  HttpUpdateTesteRatinhoByIdController,
  makeUpdateTesteRatinhoValidation,
  PrismaUpdateTesteRatinhoRepository,
} from '@/domains/teste-ratinho';

export const makeHttpUpdateTesteRatinhoByIdController =
  (): HttpUpdateTesteRatinhoByIdController => {
    const getTesteRatinhoByIdRepository =
      new PrismaGetTesteRatinhoByIdRepository();
    const updateTesteRatinhoByIdRepository =
      new PrismaUpdateTesteRatinhoRepository();
    const validation = makeUpdateTesteRatinhoValidation();

    return new HttpUpdateTesteRatinhoByIdController(
      getTesteRatinhoByIdRepository,
      updateTesteRatinhoByIdRepository,
      validation
    );
  };
