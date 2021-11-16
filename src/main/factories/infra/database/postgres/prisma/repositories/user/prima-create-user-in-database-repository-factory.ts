import { PrismaCreateUserInDatabaseRepository } from '@/infra/databases/postgres/prisma/repositories/user';

export const makePrismaCreateUserInDatabaseRepository =
  (): PrismaCreateUserInDatabaseRepository => {
    return new PrismaCreateUserInDatabaseRepository();
  };
