import {
  DeleteUserFromDatabaseUsecase,
  DeleteUserFromDatabase,
} from '@/domain/usecases/user/delete-user-from-database';
import { makePrismaDeleteUserInDatabaseRepository } from '@/main/factories/infra/database/postgres/prisma/repositories/user';
import { makeListUsersFromDatabaseUsecase } from '@/main/factories/usecases/user';

export const makeDeleteUserFromDatabaseUsecase =
  (): DeleteUserFromDatabaseUsecase => {
    const listUsersFromDatabaseUsecase = makeListUsersFromDatabaseUsecase();

    const deleteUserFromDatabaseRepository =
      makePrismaDeleteUserInDatabaseRepository();

    return new DeleteUserFromDatabase({
      listUsersFromDatabaseUsecase,
      deleteUserFromDatabaseRepository,
    });
  };
