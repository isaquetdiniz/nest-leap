import { LoginCloudService } from '@/application/services/auth';
import { LoginUsecase } from '@/domain/usecases/auth';
import {
  makeCognitoListUserInCloudProvider,
  makeCognitoLoginInCloudProvider,
} from '@/main/factories/infra/cloud/cognito';
import { makeListUsersUsecase } from '@/main/factories/usecases/user';

export const makeLoginCloudService = (): LoginUsecase => {
  const listUsersUsecase = makeListUsersUsecase();
  const loginInCloudProvider = makeCognitoLoginInCloudProvider();
  const listUserInCloudProvider = makeCognitoListUserInCloudProvider();

  return new LoginCloudService({
    listUsersUsecase,
    loginInCloudProvider,
    listUserInCloudProvider,
  });
};
