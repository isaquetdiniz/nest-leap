import {
  ListUsersFromDatabaseUsecase,
  ListUsersFromDatabase,
} from '@/domain/usecases/user/list-users-from-database';
import { makePrismaListUsersInDatabaseRepository } from '@/main/factories/infra/database/postgres/prisma/repositories/user';

export const makeListUsersFromDatabaseUsecase =
  (): ListUsersFromDatabaseUsecase => {
    const listUsersFromDatabaseRepository =
      makePrismaListUsersInDatabaseRepository();

    return new ListUsersFromDatabase({
      listUsersFromDatabaseRepository,
    });
  };
