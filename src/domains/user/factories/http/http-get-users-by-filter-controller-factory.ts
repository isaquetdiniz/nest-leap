import {
  HttpGetUsersByFilterController,
  PrismaGetUsersByFilterRepository,
  PrismaCountUsersByFilterRepository,
  makeGetUsersByFilterValidation,
} from '@/domains/user';

export const makeHttpGetUsersByFilterController =
  (): HttpGetUsersByFilterController => {
    const getUsersByFilterRepository = new PrismaGetUsersByFilterRepository();
    const countUsersByFilterRepository =
      new PrismaCountUsersByFilterRepository();
    const validation = makeGetUsersByFilterValidation();

    return new HttpGetUsersByFilterController(
      getUsersByFilterRepository,
      countUsersByFilterRepository,
      validation
    );
  };
