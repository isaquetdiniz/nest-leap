import { UpdateUserInDatabaseService } from '@/application/services/user';
import { UpdateUserUsecase } from '@/domain/usecases/user';
import { makePrismaUpdateUserInDatabaseRepository } from '@/main/factories/infra/database/orm/prisma/repositories/user';
import { makeListUsersUsecase } from '@/main/factories/services/user';

export const makeUpdateUserUsecase = (): UpdateUserUsecase => {
  const listUsersUsecase = makeListUsersUsecase();

  const updateUserInDatabaseRepository =
    makePrismaUpdateUserInDatabaseRepository();

  return new UpdateUserInDatabaseService({
    listUsersUsecase,
    updateUserInDatabaseRepository,
  });
};
