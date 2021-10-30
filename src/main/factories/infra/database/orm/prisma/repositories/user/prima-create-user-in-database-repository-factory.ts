import { PrismaCreateUserInDatabaseRepository } from '@/infra/database/orm/prisma/repositories/user';

export const makePrismaCreateUserInDatabaseRepository =
  (): PrismaCreateUserInDatabaseRepository => {
    return new PrismaCreateUserInDatabaseRepository();
  };
