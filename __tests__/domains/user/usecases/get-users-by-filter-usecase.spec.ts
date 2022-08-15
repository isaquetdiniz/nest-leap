import 'jest-ts-auto-mock';
import { createMock } from 'ts-auto-mock';
import { method, On } from 'ts-auto-mock/extension';

import { UserFactory } from '@/tests/domains/user/entities';
import {
  IGetUsersByFilterRepository,
  ICountUsersByFilterRepository,
} from '@/domains/user/usecases/repos';
import { GetUsersByFilterUsecase as UseCase } from '@/domains/user/usecases';
import { pinoLoggerLocal } from '@/shared/infra/logs';
import { OrderByFilter, Pagination } from '@/shared/helpers';

const makeSut = () => {
  const getUsersByFilterRepository: IGetUsersByFilterRepository =
    createMock<IGetUsersByFilterRepository>();
  const getUsersByFilterRepositorySpy: jest.Mock = On(
    getUsersByFilterRepository
  ).get(method((mock) => mock.get));

  const countUserByFilterRepository: ICountUsersByFilterRepository =
    createMock<ICountUsersByFilterRepository>();
  const countUserByFilterRepositorySpy: jest.Mock = On(
    countUserByFilterRepository
  ).get(method((mock) => mock.count));

  const sut = new UseCase(
    getUsersByFilterRepository,
    countUserByFilterRepository,
    pinoLoggerLocal
  );

  return {
    sut,
    getUsersByFilterRepositorySpy,
    countUserByFilterRepositorySpy,
  };
};

describe('Get User By Filters Service', () => {
  describe('With valid parameters', () => {
    it('Should get a users by filters with success', async () => {
      const {
        sut,
        getUsersByFilterRepositorySpy,
        countUserByFilterRepositorySpy,
      } = makeSut();

      const fakeUsers = UserFactory.buildList(8);

      getUsersByFilterRepositorySpy.mockResolvedValueOnce(fakeUsers);
      countUserByFilterRepositorySpy.mockResolvedValueOnce(fakeUsers.length);

      const users = await sut.execute({
        filters: {},
        orderBy: new OrderByFilter({}),
        pagination: new Pagination({}),
      });

      expect(users.users).toStrictEqual(fakeUsers);
      expect(users.totalUsers).toEqual(fakeUsers.length);
      expect(getUsersByFilterRepositorySpy).toBeCalledTimes(1);
      expect(countUserByFilterRepositorySpy).toBeCalledTimes(1);
    });
  });
});
