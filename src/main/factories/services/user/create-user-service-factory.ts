import { CreateUserInDatabaseService } from '@/application/services/user';
import { CreateUserUsecase } from '@/domain/usecases/user';
import { makePrismaCreateUserInDatabaseRepository } from '@/main/factories/infra/database/orm/prisma/repositories/user';
import { makeUUIDGeneratorAdapter } from '@/main/factories/infra/uuid';

export const makeCreateUserUsecase = (): CreateUserUsecase => {
  const createUserInDatabaseRepository =
    makePrismaCreateUserInDatabaseRepository();
  const UUIDGenerator = makeUUIDGeneratorAdapter();

  return new CreateUserInDatabaseService({
    createUserInDatabaseRepository,
    UUIDGenerator,
  });
};
