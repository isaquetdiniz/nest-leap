import { DeleteUserInDatabaseService } from '@/application/services/user';
import { DeleteUserUsecase } from '@/domain/usecases/user';
import { makePrismaDeleteUserInDatabaseRepository } from '@/main/factories/infra/database/orm/prisma/repositories/user';
import { makeListUsersUsecase } from '@/main/factories/services/user';

export const makeDeleteUserUsecase = (): DeleteUserUsecase => {
  const listUsersUsecase = makeListUsersUsecase();

  const deleteUserInDatabaseRepository =
    makePrismaDeleteUserInDatabaseRepository();

  return new DeleteUserInDatabaseService({
    listUsersUsecase,
    deleteUserInDatabaseRepository,
  });
};
