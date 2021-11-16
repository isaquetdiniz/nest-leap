import { UpdateUserInDatabaseRepository } from '@/application/protocols/database/repositories/user';
import { PrismaUpdateUserInDatabaseRepository } from '@/infra/databases/postgres/prisma/repositories/user';

export const makePrismaUpdateUserInDatabaseRepository =
  (): UpdateUserInDatabaseRepository => {
    return new PrismaUpdateUserInDatabaseRepository();
  };
