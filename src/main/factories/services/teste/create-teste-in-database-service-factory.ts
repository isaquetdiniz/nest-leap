import { CreateTesteInDatabaseService } from '@/application/services/teste';
import { CreateTesteInDatabaseUsecase } from '@/application/usecases/teste';
import { makePrismaCreateTesteInDatabaseRepository } from '@/main/factories/infra/database/orm/prisma/repositories/teste';
import { makeUUIDGeneratorAdapter } from '@/main/factories/infra/uuid';
import { makeListTestesUsecase } from '@/main/factories/services/teste';

export const makeCreateTesteInDatabaseUsecase =
  (): CreateTesteInDatabaseUsecase => {
    const createTesteInDatabaseRepository =
      makePrismaCreateTesteInDatabaseRepository();

    const listTestesUsecase = makeListTestesUsecase();

    const UUIDGenerator = makeUUIDGeneratorAdapter();

    return new CreateTesteInDatabaseService({
      createTesteInDatabaseRepository,
      listTestesUsecase,
      UUIDGenerator,
    });
  };
