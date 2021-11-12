import { DeleteUserInDatabaseAndCloudService } from '@/application/services/user';
import { DeleteUserUsecase } from '@/domain/user/usecases/user';
import { makePrismaDeleteUserInDatabaseRepository } from '@/main/factories/infra/database/orm/prisma/repositories/user';
import { makeListUsersUsecase } from '@/main/factories/services/user';
import { makeCognitoDeleteUserFromCloudProvider } from '../../infra/cloud/cognito';

export const makeDeleteUserUsecase = (): DeleteUserUsecase => {
  const listUsersUsecase = makeListUsersUsecase();

  const deleteUserInDatabaseRepository =
    makePrismaDeleteUserInDatabaseRepository();

  const deleteUserFromCloudProvider = makeCognitoDeleteUserFromCloudProvider();

  return new DeleteUserInDatabaseAndCloudService({
    listUsersUsecase,
    deleteUserInDatabaseRepository,
    deleteUserFromCloudProvider,
  });
};
