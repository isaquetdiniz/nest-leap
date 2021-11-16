import { FirstLoginCloudService } from '@/application/services/auth';
import { FirstLoginUsecase } from '@/domain/usecases/auth';
import {
  makeCognitoFirstLoginInCloudProvider,
  makeCognitoListUserInCloudProvider,
} from '@/main/factories/infra/cloud/cognito';
import { makeListUsersUsecase } from '@/main/factories/usecases/user';
import { makeLoginCloudService } from '@/main/factories/usecases/auth';

export const makeFirstLoginCloudService = (): FirstLoginUsecase => {
  const listUsersUsecase = makeListUsersUsecase();
  const loginUsecase = makeLoginCloudService();
  const listUserInCloudProvider = makeCognitoListUserInCloudProvider();
  const firstLoginInCloudProvider = makeCognitoFirstLoginInCloudProvider();

  return new FirstLoginCloudService({
    loginUsecase,
    listUsersUsecase,
    listUserInCloudProvider,
    firstLoginInCloudProvider,
  });
};
