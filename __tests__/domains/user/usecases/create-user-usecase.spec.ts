import 'jest-ts-auto-mock';
import { createMock } from 'ts-auto-mock';
import { method, On } from 'ts-auto-mock/extension';

import { UserFactory } from '@/tests/domains/user/entities';
import {
  ISaveUserRepository,
  ISaveUserInCloudRepository,
  IGetUserByEmailRepository,
  IGetUserByEmailInCloudRepository,
  IDeleteUserByIdRepository,
} from '@/domains/user/usecases/repos';
import { UserAlreadyExistsException } from '@/domains/user/usecases/exceptions';
import { CreateUserUsecase as UseCase } from '@/domains/user/usecases';
import { IUuidGenerator } from '@/shared/protocols';
import { pinoLoggerLocal } from '@/shared/infra/logs';

const makeSut = () => {
  const uuidGenerator: IUuidGenerator = createMock<IUuidGenerator>();

  const getUserByEmailRepository: IGetUserByEmailRepository =
    createMock<IGetUserByEmailRepository>();
  const getUserByEmailRepositorySpy: jest.Mock = On(
    getUserByEmailRepository
  ).get(method((mock) => mock.getByEmail));

  const getUserByEmailInCloudRepository: IGetUserByEmailInCloudRepository =
    createMock<IGetUserByEmailInCloudRepository>();
  const getUserByEmailInCloudRepositorySpy: jest.Mock = On(
    getUserByEmailInCloudRepository
  ).get(method((mock) => mock.getByEmail));

  const saveUserRepository: ISaveUserRepository =
    createMock<ISaveUserRepository>();
  const saveUserRepositorySpy: jest.Mock = On(saveUserRepository).get(
    method((mock) => mock.save)
  );

  const saveUserInCloudRepository: ISaveUserInCloudRepository =
    createMock<ISaveUserInCloudRepository>();
  const saveUserInCloudRepositorySpy: jest.Mock = On(
    saveUserInCloudRepository
  ).get(method((mock) => mock.save));

  const deleteUserByIdRepository: IDeleteUserByIdRepository =
    createMock<IDeleteUserByIdRepository>();
  const deleteUserByIdRepositorySpy: jest.Mock = On(
    deleteUserByIdRepository
  ).get(method((mock) => mock.delete));

  const sut = new UseCase(
    getUserByEmailRepository,
    getUserByEmailInCloudRepository,
    uuidGenerator,
    saveUserRepository,
    saveUserInCloudRepository,
    deleteUserByIdRepository,
    pinoLoggerLocal
  );

  return {
    sut,
    getUserByEmailRepositorySpy,
    getUserByEmailInCloudRepositorySpy,
    saveUserRepositorySpy,
    saveUserInCloudRepositorySpy,
    deleteUserByIdRepositorySpy,
  };
};

describe('Create User Service', () => {
  describe('With valid parameters', () => {
    it('Should return a new User with success', async () => {
      const {
        sut,
        getUserByEmailRepositorySpy,
        getUserByEmailInCloudRepositorySpy,
        saveUserRepositorySpy,
        saveUserInCloudRepositorySpy,
        deleteUserByIdRepositorySpy,
      } = makeSut();

      const fakeUser = UserFactory.build();

      getUserByEmailRepositorySpy.mockResolvedValueOnce(null);
      getUserByEmailInCloudRepositorySpy.mockResolvedValueOnce(null);
      saveUserRepositorySpy.mockResolvedValueOnce(fakeUser);

      const userCreated = await sut.execute(fakeUser);

      expect(userCreated).toStrictEqual(fakeUser);
      expect(getUserByEmailRepositorySpy).toBeCalledTimes(1);
      expect(getUserByEmailInCloudRepositorySpy).toBeCalledTimes(1);
      expect(saveUserRepositorySpy).toBeCalledTimes(1);
      expect(saveUserInCloudRepositorySpy).toBeCalledTimes(1);
      expect(deleteUserByIdRepositorySpy).toBeCalledTimes(0);
    });
  });

  describe('With invalid parameters', () => {
    it('Should not create user if user already exist', async () => {
      const {
        sut,
        getUserByEmailRepositorySpy,
        getUserByEmailInCloudRepositorySpy,
        saveUserRepositorySpy,
        saveUserInCloudRepositorySpy,
        deleteUserByIdRepositorySpy,
      } = makeSut();

      const fakeUser = UserFactory.build();

      getUserByEmailRepositorySpy.mockResolvedValueOnce(fakeUser);

      const testScript = () => sut.execute(fakeUser);

      await expect(testScript).rejects.toThrow(UserAlreadyExistsException);

      expect(getUserByEmailRepositorySpy).toBeCalledTimes(1);
      expect(getUserByEmailInCloudRepositorySpy).toBeCalledTimes(0);
      expect(saveUserRepositorySpy).toBeCalledTimes(0);
      expect(saveUserInCloudRepositorySpy).toBeCalledTimes(0);
      expect(deleteUserByIdRepositorySpy).toBeCalledTimes(0);
    });

    it('Should not create user if user already exist in cloud', async () => {
      const {
        sut,
        getUserByEmailRepositorySpy,
        getUserByEmailInCloudRepositorySpy,
        saveUserRepositorySpy,
        saveUserInCloudRepositorySpy,
        deleteUserByIdRepositorySpy,
      } = makeSut();

      const fakeUser = UserFactory.build();

      getUserByEmailRepositorySpy.mockResolvedValueOnce(null);
      getUserByEmailInCloudRepositorySpy.mockResolvedValueOnce(fakeUser);

      const testScript = () => sut.execute(fakeUser);

      await expect(testScript).rejects.toThrow(UserAlreadyExistsException);

      expect(getUserByEmailRepositorySpy).toBeCalledTimes(1);
      expect(getUserByEmailInCloudRepositorySpy).toBeCalledTimes(1);
      expect(saveUserRepositorySpy).toBeCalledTimes(0);
      expect(saveUserInCloudRepositorySpy).toBeCalledTimes(0);
      expect(deleteUserByIdRepositorySpy).toBeCalledTimes(0);
    });

    it('Should throw if CreateUserRepository throws', async () => {
      const {
        sut,
        getUserByEmailRepositorySpy,
        getUserByEmailInCloudRepositorySpy,
        saveUserRepositorySpy,
        saveUserInCloudRepositorySpy,
        deleteUserByIdRepositorySpy,
      } = makeSut();

      const fakeUser = UserFactory.build();

      getUserByEmailRepositorySpy.mockResolvedValueOnce(null);
      getUserByEmailInCloudRepositorySpy.mockResolvedValueOnce(null);
      saveUserRepositorySpy.mockImplementationOnce(() => {
        return Promise.reject(new Error());
      });

      const testScript = () => sut.execute(fakeUser);

      await expect(testScript).rejects.toThrow();

      expect(getUserByEmailRepositorySpy).toBeCalledTimes(1);
      expect(getUserByEmailInCloudRepositorySpy).toBeCalledTimes(1);
      expect(saveUserRepositorySpy).toBeCalledTimes(1);
      expect(saveUserInCloudRepositorySpy).toBeCalledTimes(0);
      expect(deleteUserByIdRepositorySpy).toBeCalledTimes(0);
    });

    it('Should throw if CreateUserInCloudRepository throws', async () => {
      const {
        sut,
        getUserByEmailRepositorySpy,
        getUserByEmailInCloudRepositorySpy,
        saveUserRepositorySpy,
        saveUserInCloudRepositorySpy,
        deleteUserByIdRepositorySpy,
      } = makeSut();

      const fakeUser = UserFactory.build();

      getUserByEmailRepositorySpy.mockResolvedValueOnce(null);
      getUserByEmailInCloudRepositorySpy.mockResolvedValueOnce(null);
      saveUserInCloudRepositorySpy.mockImplementationOnce(() => {
        return Promise.reject(new Error());
      });

      const testScript = () => sut.execute(fakeUser);

      await expect(testScript).rejects.toThrow();

      expect(getUserByEmailRepositorySpy).toBeCalledTimes(1);
      expect(getUserByEmailInCloudRepositorySpy).toBeCalledTimes(1);
      expect(saveUserRepositorySpy).toBeCalledTimes(1);
      expect(saveUserInCloudRepositorySpy).toBeCalledTimes(1);
      expect(deleteUserByIdRepositorySpy).toBeCalledTimes(1);
    });
  });
});
