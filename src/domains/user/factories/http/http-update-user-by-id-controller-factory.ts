import {
  PrismaGetUserByIdRepository,
  HttpUpdateUserByIdController,
  makeUpdateUserValidation,
  PrismaUpdateUserRepository,
} from '@/domains/user';
import { pinoLoggerLocal } from '@/shared/infra/logs';

export const makeHttpUpdateUserByIdController =
  (): HttpUpdateUserByIdController => {
    const getUserByIdRepository = new PrismaGetUserByIdRepository();
    const updateUserByIdRepository = new PrismaUpdateUserRepository();
    const validation = makeUpdateUserValidation();
    const logger = pinoLoggerLocal;

    return new HttpUpdateUserByIdController(
      getUserByIdRepository,
      updateUserByIdRepository,
      validation,
      logger
    );
  };
