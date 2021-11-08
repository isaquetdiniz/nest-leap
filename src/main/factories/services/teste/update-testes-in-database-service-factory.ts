import { UpdateTesteInDatabaseService } from '@/application/services/teste';
import { UpdateTesteUsecase } from '@/domain/usecases/teste';
import { makePrismaUpdateTesteInDatabaseRepository } from '@/main/factories/infra/database/orm/prisma/repositories/teste';
import { makeListTestesUsecase } from '@/main/factories/services/teste';

export const makeUpdateTesteUsecase = (): UpdateTesteUsecase => {
  const listTestesUsecase = makeListTestesUsecase();

  const updateTesteInDatabaseRepository =
    makePrismaUpdateTesteInDatabaseRepository();

  return new UpdateTesteInDatabaseService({
    listTestesUsecase,
    updateTesteInDatabaseRepository,
  });
};
