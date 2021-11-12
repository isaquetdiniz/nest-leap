import { ListUserInDatabaseService } from '@/application/services/user';
import { ListUsersUsecase } from '@/domain/user/usecases/user';
import { makePrismaListUsersInDatabaseRepository } from '@/main/factories/infra/database/orm/prisma/repositories/user';

export const makeListUsersUsecase = (): ListUsersUsecase => {
  const listUsersInDatabaseRepository =
    makePrismaListUsersInDatabaseRepository();

  return new ListUserInDatabaseService({
    listUsersInDatabaseRepository,
  });
};
