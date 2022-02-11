import {
  HttpGetTesteRatinhoByIdController,
  PrismaGetTesteRatinhoByIdRepository,
  makeGetTesteRatinhoByIdValidation,
} from '@/domains/teste-ratinho';

export const makeHttpGetTesteRatinhoByIdController =
  (): HttpGetTesteRatinhoByIdController => {
    const getTesteRatinhoByIdRepository =
      new PrismaGetTesteRatinhoByIdRepository();
    const validation = makeGetTesteRatinhoByIdValidation();

    return new HttpGetTesteRatinhoByIdController(
      getTesteRatinhoByIdRepository,
      validation
    );
  };
