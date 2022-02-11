import {
  HttpGetTesteRatinhosByFilterController,
  PrismaGetTesteRatinhosByFilterRepository,
  PrismaCountTesteRatinhosByFilterRepository,
  makeGetTesteRatinhosByFilterValidation,
} from '@/domains/teste-ratinho';

export const makeHttpGetTesteRatinhosByFilterController =
  (): HttpGetTesteRatinhosByFilterController => {
    const getTesteRatinhosByFilterRepository =
      new PrismaGetTesteRatinhosByFilterRepository();
    const countTesteRatinhosByFilterRepository =
      new PrismaCountTesteRatinhosByFilterRepository();
    const validation = makeGetTesteRatinhosByFilterValidation();

    return new HttpGetTesteRatinhosByFilterController(
      getTesteRatinhosByFilterRepository,
      countTesteRatinhosByFilterRepository,
      validation
    );
  };
