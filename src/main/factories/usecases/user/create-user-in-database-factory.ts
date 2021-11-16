import {
  CreateUserInDatabase,
  CreateUserInDatabaseUsecase,
} from '@/domain/usecases/user/create-user-in-database';
import { makePrismaCreateUserInDatabaseRepository } from '@/main/factories/infra/database/orm/prisma/repositories/user';
import { makeUUIDGeneratorAdapter } from '@/main/factories/infra/uuid';
import { makeListUsersFromDatabaseUsecase } from '@/main/factories/usecases/user';

export const makeCreateUserInDatabaseUsecase =
  (): CreateUserInDatabaseUsecase => {
    const saveUserInDatabaseRepository =
      makePrismaCreateUserInDatabaseRepository();

    const listUsersFromDatabaseUsecase = makeListUsersFromDatabaseUsecase();

    const UUIDGenerator = makeUUIDGeneratorAdapter();

    return new CreateUserInDatabase({
      saveUserInDatabaseRepository,
      listUsersFromDatabaseUsecase,
      UUIDGenerator,
    });
  };
