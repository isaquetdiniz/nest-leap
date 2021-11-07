import { CreateUserInDatabaseService } from '@/application/services/user';
import { CreateUserInDatabaseUsecase } from '@/application/usecases/user';
import { makePrismaCreateUserInDatabaseRepository } from '@/main/factories/infra/database/orm/prisma/repositories/user';
import { makeUUIDGeneratorAdapter } from '@/main/factories/infra/uuid';
import { makeListUsersUsecase } from '@/main/factories/services/user';

export const makeCreateUserInDatabaseUsecase =
  (): CreateUserInDatabaseUsecase => {
    const createUserInDatabaseRepository =
      makePrismaCreateUserInDatabaseRepository();

    const listUsersUsecase = makeListUsersUsecase();

    const UUIDGenerator = makeUUIDGeneratorAdapter();

    return new CreateUserInDatabaseService({
      createUserInDatabaseRepository,
      listUsersUsecase,
      UUIDGenerator,
    });
  };
