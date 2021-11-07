import { UpdateUserInDatabaseRepository } from '@/application/protocols/database/repositories/user';
import { PrismaUpdateUserInDatabaseRepository } from '@/infra/database/orm/prisma/repositories/user';

export const makePrismaUpdateUserInDatabaseRepository =
  (): UpdateUserInDatabaseRepository => {
    return new PrismaUpdateUserInDatabaseRepository();
  };
