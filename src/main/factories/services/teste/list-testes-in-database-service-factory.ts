import { ListTesteInDatabaseService } from '@/application/services/teste';
import { ListTestesUsecase } from '@/domain/usecases/teste';
import { makePrismaListTestesInDatabaseRepository } from '@/main/factories/infra/database/orm/prisma/repositories/teste';

export const makeListTestesUsecase = (): ListTestesUsecase => {
  const listTestesInDatabaseRepository =
    makePrismaListTestesInDatabaseRepository();

  return new ListTesteInDatabaseService({
    listTestesInDatabaseRepository,
  });
};
