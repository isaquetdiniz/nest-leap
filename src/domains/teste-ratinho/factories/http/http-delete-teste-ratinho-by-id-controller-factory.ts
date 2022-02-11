import {
  PrismaDeleteTesteRatinhoByIdRepository,
  HttpDeleteTesteRatinhoByIdController,
  PrismaGetTesteRatinhoByIdRepository,
  makeDeleteTesteRatinhoByIdValidation,
} from '@/domains/teste-ratinho';

export const makeHttpDeleteTesteRatinhoByIdController =
  (): HttpDeleteTesteRatinhoByIdController => {
    const getTesteRatinhoByIdRepository =
      new PrismaGetTesteRatinhoByIdRepository();
    const deleteTesteRatinhoByIdRepository =
      new PrismaDeleteTesteRatinhoByIdRepository();
    const validation = makeDeleteTesteRatinhoByIdValidation();

    return new HttpDeleteTesteRatinhoByIdController(
      getTesteRatinhoByIdRepository,
      deleteTesteRatinhoByIdRepository,
      validation
    );
  };
