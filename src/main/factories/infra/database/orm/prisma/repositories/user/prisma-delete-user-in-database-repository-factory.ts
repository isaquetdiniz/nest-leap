import { DeleteUserInDatabaseRepository } from '@/application/protocols/database/repositories/user';
import { PrismaDeleteUserInDatabaseRepository } from '@/infra/database/orm/prisma/repositories/user';

export const makePrismaDeleteUserInDatabaseRepository =
  (): DeleteUserInDatabaseRepository => {
    return new PrismaDeleteUserInDatabaseRepository();
  };
