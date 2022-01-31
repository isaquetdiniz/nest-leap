import {
  PrismaGetUserByIdRepository,
  HttpUpdateUserByIdController,
  makeUpdateUserValidation,
  PrismaUpdateUserRepository,
} from '@/domains/user';

export const makeHttpUpdateUserByIdController =
  (): HttpUpdateUserByIdController => {
    const getUserByIdRepository = new PrismaGetUserByIdRepository();
    const updateUserByIdRepository = new PrismaUpdateUserRepository();
    const validation = makeUpdateUserValidation();

    return new HttpUpdateUserByIdController(
      getUserByIdRepository,
      updateUserByIdRepository,
      validation
    );
  };
