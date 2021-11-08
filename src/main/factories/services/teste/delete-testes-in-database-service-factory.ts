import { DeleteTesteInDatabaseService } from '@/application/services/teste';
import { DeleteTesteUsecase } from '@/domain/usecases/teste';
import { makePrismaDeleteTesteInDatabaseRepository } from '@/main/factories/infra/database/orm/prisma/repositories/teste';
import { makeListTestesUsecase } from '@/main/factories/services/teste';

export const makeDeleteTesteUsecase = (): DeleteTesteUsecase => {
  const listTestesUsecase = makeListTestesUsecase();

  const deleteTesteInDatabaseRepository =
    makePrismaDeleteTesteInDatabaseRepository();

  return new DeleteTesteInDatabaseService({
    listTestesUsecase,
    deleteTesteInDatabaseRepository,
  });
};
