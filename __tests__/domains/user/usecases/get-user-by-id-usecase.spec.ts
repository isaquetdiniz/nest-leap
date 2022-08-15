import 'jest-ts-auto-mock';
import { createMock } from 'ts-auto-mock';
import { method, On } from 'ts-auto-mock/extension';

import { UserFactory } from '@/tests/domains/user/entities';
import {
  IGetUserByIdRepository,
  IGetUserByEmailInCloudRepository,
} from '@/domains/user/usecases/repos';
import { UserNotFoundException } from '@/domains/user/usecases/exceptions';
import { GetUserByIdUsecase as UseCase } from '@/domains/user/usecases';
import { pinoLoggerLocal } from '@/shared/infra/logs';

const makeSut = () => {
  const getUserByIdRepository: IGetUserByIdRepository =
    createMock<IGetUserByIdRepository>();
  const getUserByIdRepositorySpy: jest.Mock = On(getUserByIdRepository).get(
    method((mock) => mock.getById)
  );

  const getUserByEmailInCloudRepository: IGetUserByEmailInCloudRepository =
    createMock<IGetUserByEmailInCloudRepository>();
  const getUserByEmailInCloudRepositorySpy: jest.Mock = On(
    getUserByEmailInCloudRepository
  ).get(method((mock) => mock.getByEmail));

  const sut = new UseCase(
    getUserByIdRepository,
    getUserByEmailInCloudRepository,
    pinoLoggerLocal
  );

  return {
    sut,
    getUserByIdRepositorySpy,
    getUserByEmailInCloudRepositorySpy,
  };
};

describe('Get User By Id Service', () => {
  describe('With valid parameters', () => {
    it('Should get a user by id with success', async () => {
      const {
        sut,
        getUserByIdRepositorySpy,
        getUserByEmailInCloudRepositorySpy,
      } = makeSut();

      const fakeUser = UserFactory.build();

      getUserByIdRepositorySpy.mockResolvedValueOnce(fakeUser);
      getUserByEmailInCloudRepositorySpy.mockResolvedValueOnce(fakeUser);

      await sut.execute(fakeUser.id);

      expect(getUserByIdRepositorySpy).toBeCalledTimes(1);
      expect(getUserByEmailInCloudRepositorySpy).toBeCalledTimes(1);
    });

    it('Should return null if user not found', async () => {
      const {
        sut,
        getUserByIdRepositorySpy,
        getUserByEmailInCloudRepositorySpy,
      } = makeSut();

      const fakeUser = UserFactory.build();

      getUserByIdRepositorySpy.mockResolvedValueOnce(null);

      await sut.execute(fakeUser.id);

      expect(getUserByIdRepositorySpy).toBeCalledTimes(1);
      expect(getUserByEmailInCloudRepositorySpy).toBeCalledTimes(0);
    });
  });

  describe('With invalid parameters', () => {
    it('Should not get user if not exists in cloud', async () => {
      const {
        sut,
        getUserByIdRepositorySpy,
        getUserByEmailInCloudRepositorySpy,
      } = makeSut();

      const fakeUser = UserFactory.build();

      getUserByIdRepositorySpy.mockResolvedValueOnce(fakeUser);
      getUserByEmailInCloudRepositorySpy.mockResolvedValueOnce(null);

      const testScript = () => sut.execute(fakeUser.id);

      await expect(testScript).rejects.toThrow(UserNotFoundException);

      expect(getUserByIdRepositorySpy).toBeCalledTimes(1);
      expect(getUserByEmailInCloudRepositorySpy).toBeCalledTimes(1);
    });

    it('Should throw if GetUserByEmailInCloudRepository throws', async () => {
      const {
        sut,
        getUserByIdRepositorySpy,
        getUserByEmailInCloudRepositorySpy,
      } = makeSut();

      const fakeUser = UserFactory.build();

      getUserByIdRepositorySpy.mockResolvedValueOnce(fakeUser);
      getUserByEmailInCloudRepositorySpy.mockImplementationOnce(() => {
        return Promise.reject(new Error());
      });

      const testScript = () => sut.execute(fakeUser.id);

      await expect(testScript).rejects.toThrow();

      expect(getUserByIdRepositorySpy).toBeCalledTimes(1);
      expect(getUserByEmailInCloudRepositorySpy).toBeCalledTimes(1);
    });
  });
});
