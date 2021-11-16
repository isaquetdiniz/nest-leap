import { FirstLoginCloudService } from '@/application/services/auth';
import { FirstLoginUsecase } from '@/domain/usecases/auth';
import {
  makeCognitoFirstLoginInCloudProvider,
  makeCognitoListUserInCloudProvider,
} from '@/main/factories/infra/cloud/cognito';
import { makeListUsersUsecase } from '@/main/factories/services/user';
import { makeLoginCloudService } from '@/main/factories/services/auth';

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
