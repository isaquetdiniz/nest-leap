import { ListUsersInDatabaseRepository } from '@/application/protocols/database/repositories/user';
import { PrismaListUsersInDatabaseRepository } from '@/infra/databases/postgres/prisma/repositories/user';

export const makePrismaListUsersInDatabaseRepository =
  (): ListUsersInDatabaseRepository => {
    return new PrismaListUsersInDatabaseRepository();
  };
