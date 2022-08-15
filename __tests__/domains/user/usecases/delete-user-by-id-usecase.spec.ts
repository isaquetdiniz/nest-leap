import 'jest-ts-auto-mock';
import { createMock } from 'ts-auto-mock';
import { method, On } from 'ts-auto-mock/extension';

import { UserFactory } from '@/tests/domains/user/entities';
import {
  IGetUserByIdRepository,
  IGetUserByEmailInCloudRepository,
  IDeleteUserByIdRepository,
  IDeleteUserByEmailInCloudRepository,
} from '@/domains/user/usecases/repos';
import { UserNotFoundException } from '@/domains/user/usecases/exceptions';
import { DeleteUserByIdUsecase as UseCase } from '@/domains/user/usecases';
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

  const deleteUserByIdRepository: IDeleteUserByIdRepository =
    createMock<IDeleteUserByIdRepository>();
  const deleteUserByIdRepositorySpy: jest.Mock = On(
    deleteUserByIdRepository
  ).get(method((mock) => mock.delete));

  const deleteUserByEmailInCloudRepository: IDeleteUserByEmailInCloudRepository =
    createMock<IDeleteUserByEmailInCloudRepository>();
  const deleteUserByEmailInCloudRepositorySpy: jest.Mock = On(
    deleteUserByEmailInCloudRepository
  ).get(method((mock) => mock.delete));

  const sut = new UseCase(
    getUserByIdRepository,
    getUserByEmailInCloudRepository,
    deleteUserByIdRepository,
    deleteUserByEmailInCloudRepository,
    pinoLoggerLocal
  );

  return {
    sut,
    getUserByIdRepositorySpy,
    getUserByEmailInCloudRepositorySpy,
    deleteUserByIdRepositorySpy,
    deleteUserByEmailInCloudRepositorySpy,
  };
};

describe('Delete User Service', () => {
  describe('With valid parameters', () => {
    it('Should delete a user with success', async () => {
      const {
        sut,
        getUserByIdRepositorySpy,
        getUserByEmailInCloudRepositorySpy,
        deleteUserByIdRepositorySpy,
        deleteUserByEmailInCloudRepositorySpy,
      } = makeSut();

      const fakeUser = UserFactory.build();

      getUserByIdRepositorySpy.mockResolvedValueOnce(fakeUser);
      getUserByEmailInCloudRepositorySpy.mockResolvedValueOnce(fakeUser);

      await sut.execute(fakeUser.id);

      expect(getUserByIdRepositorySpy).toBeCalledTimes(1);
      expect(getUserByEmailInCloudRepositorySpy).toBeCalledTimes(1);
      expect(deleteUserByIdRepositorySpy).toBeCalledTimes(1);
      expect(deleteUserByEmailInCloudRepositorySpy).toBeCalledTimes(1);
    });
  });

  describe('With invalid parameters', () => {
    it('Should not delete user if not exists', async () => {
      const {
        sut,
        getUserByIdRepositorySpy,
        getUserByEmailInCloudRepositorySpy,
        deleteUserByIdRepositorySpy,
        deleteUserByEmailInCloudRepositorySpy,
      } = makeSut();

      const { id } = UserFactory.build();

      getUserByIdRepositorySpy.mockResolvedValueOnce(null);

      const testScript = () => sut.execute(id);

      await expect(testScript).rejects.toThrow(UserNotFoundException);

      expect(getUserByIdRepositorySpy).toBeCalledTimes(1);
      expect(getUserByEmailInCloudRepositorySpy).toBeCalledTimes(0);
      expect(deleteUserByIdRepositorySpy).toBeCalledTimes(0);
      expect(deleteUserByEmailInCloudRepositorySpy).toBeCalledTimes(0);
    });

    it('Should not delete user if not exists in cloud', async () => {
      const {
        sut,
        getUserByIdRepositorySpy,
        getUserByEmailInCloudRepositorySpy,
        deleteUserByIdRepositorySpy,
        deleteUserByEmailInCloudRepositorySpy,
      } = makeSut();

      const fakeUser = UserFactory.build();

      getUserByIdRepositorySpy.mockResolvedValueOnce(fakeUser);
      getUserByEmailInCloudRepositorySpy.mockResolvedValueOnce(null);

      const testScript = () => sut.execute(fakeUser.id);

      await expect(testScript).rejects.toThrow(UserNotFoundException);

      expect(getUserByIdRepositorySpy).toBeCalledTimes(1);
      expect(getUserByEmailInCloudRepositorySpy).toBeCalledTimes(1);
      expect(deleteUserByIdRepositorySpy).toBeCalledTimes(0);
      expect(deleteUserByEmailInCloudRepositorySpy).toBeCalledTimes(0);
    });

    it('Should throw if DeleteUserByIdRepository throws', async () => {
      const {
        sut,
        getUserByIdRepositorySpy,
        getUserByEmailInCloudRepositorySpy,
        deleteUserByIdRepositorySpy,
        deleteUserByEmailInCloudRepositorySpy,
      } = makeSut();

      const fakeUser = UserFactory.build();

      getUserByIdRepositorySpy.mockResolvedValueOnce(fakeUser);
      getUserByEmailInCloudRepositorySpy.mockResolvedValueOnce(fakeUser);
      deleteUserByIdRepositorySpy.mockImplementationOnce(() => {
        return Promise.reject(new Error());
      });

      const testScript = () => sut.execute(fakeUser.id);

      await expect(testScript).rejects.toThrow();

      expect(getUserByIdRepositorySpy).toBeCalledTimes(1);
      expect(getUserByEmailInCloudRepositorySpy).toBeCalledTimes(1);
      expect(deleteUserByIdRepositorySpy).toBeCalledTimes(1);
      expect(deleteUserByEmailInCloudRepositorySpy).toBeCalledTimes(0);
    });

    it('Should throw if DeleteUserByEmailInCloudRepository throws', async () => {
      const {
        sut,
        getUserByIdRepositorySpy,
        getUserByEmailInCloudRepositorySpy,
        deleteUserByIdRepositorySpy,
        deleteUserByEmailInCloudRepositorySpy,
      } = makeSut();

      const fakeUser = UserFactory.build();

      getUserByIdRepositorySpy.mockResolvedValueOnce(fakeUser);
      getUserByEmailInCloudRepositorySpy.mockResolvedValueOnce(fakeUser);
      deleteUserByEmailInCloudRepositorySpy.mockImplementationOnce(() => {
        return Promise.reject(new Error());
      });

      const testScript = () => sut.execute(fakeUser.id);

      await expect(testScript).rejects.toThrow();

      expect(getUserByIdRepositorySpy).toBeCalledTimes(1);
      expect(getUserByEmailInCloudRepositorySpy).toBeCalledTimes(1);
      expect(deleteUserByIdRepositorySpy).toBeCalledTimes(1);
      expect(deleteUserByEmailInCloudRepositorySpy).toBeCalledTimes(1);
    });
  });
});
