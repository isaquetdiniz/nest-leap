import {
  HttpCreateUserController,
  CognitoGetUserByEmailInCloudRepository,
  CognitoSaveUserInCloudRepository,
  PrismaDeleteUserByIdRepository,
  PrismaGetUserByEmailRepository,
  PrismaSaveUserRepository,
  makeCreateUserValidation,
} from '@/domains/user';

import { UUIDGeneratorAdapter } from '@/shared/infra/uuid';

export const makeHttpCreateUserController = (): HttpCreateUserController => {
  const getUserByEmailRepository = new PrismaGetUserByEmailRepository();
  const getUserByEmailInCloudRepository =
    new CognitoGetUserByEmailInCloudRepository();
  const uuidGenerator = new UUIDGeneratorAdapter();
  const saveUserRepository = new PrismaSaveUserRepository();
  const saveUserInCloudRepository = new CognitoSaveUserInCloudRepository();
  const deleteUserByIdRepository = new PrismaDeleteUserByIdRepository();
  const validation = makeCreateUserValidation();

  return new HttpCreateUserController(
    getUserByEmailRepository,
    getUserByEmailInCloudRepository,
    uuidGenerator,
    saveUserRepository,
    saveUserInCloudRepository,
    deleteUserByIdRepository,
    validation
  );
};
