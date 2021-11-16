import { DeleteUserInDatabaseRepository } from '@/application/protocols/database/repositories/user';
import { PrismaDeleteUserInDatabaseRepository } from '@/infra/databases/postgres/prisma/repositories/user';

export const makePrismaDeleteUserInDatabaseRepository =
  (): DeleteUserInDatabaseRepository => {
    return new PrismaDeleteUserInDatabaseRepository();
  };
