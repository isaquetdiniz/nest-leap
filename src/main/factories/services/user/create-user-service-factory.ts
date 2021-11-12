import { CreateUserInDatabaseAndCloudService } from '@/application/services/user';
import { CreateUserUsecase } from '@/domain/user/usecases/user';
import { makeDeleteUserUsecase } from '@/main/factories/services/user';
import { makeCreateUserClouUsecase } from './create-user-cloud-service-factory';
import { makeCreateUserInDatabaseUsecase } from './create-user-in-database-service-factory';

export const makeCreateUserUsecase = (): CreateUserUsecase => {
  const createUserInDatabaseUsecase = makeCreateUserInDatabaseUsecase();
  const createUserCloudUsecase = makeCreateUserClouUsecase();
  const deleteUserUsecase = makeDeleteUserUsecase();

  return new CreateUserInDatabaseAndCloudService({
    createUserInDatabaseUsecase,
    createUserCloudUsecase,
    deleteUserUsecase,
  });
};
