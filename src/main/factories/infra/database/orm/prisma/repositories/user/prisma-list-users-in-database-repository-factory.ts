import { ListUsersInDatabaseRepository } from '@/application/protocols/database/repositories/user';
import { PrismaListUsersInDatabaseRepository } from '@/infra/database/orm/prisma/repositories/user';

export const makePrismaListUsersInDatabaseRepository =
  (): ListUsersInDatabaseRepository => {
    return new PrismaListUsersInDatabaseRepository();
  };
