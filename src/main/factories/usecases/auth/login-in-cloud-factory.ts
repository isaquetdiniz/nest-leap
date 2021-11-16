import { LoginInCloudUsecase } from '@/domain/usecases/auth';
import { LoginInCloud } from '@/domain/usecases/auth/login-in-cloud/login-in-cloud';
import {
  makeCognitoListUserInCloudProvider,
  makeCognitoLoginInCloudProvider,
} from '@/main/factories/infra/cloud/cognito';
import { makeListUsersFromDatabaseUsecase } from '@/main/factories/usecases/user';

export const makeLoginInCloudCloudUsecase = (): LoginInCloudUsecase => {
  const listUsersFromDatabaseUsecase = makeListUsersFromDatabaseUsecase();
  const loginInCloudProvider = makeCognitoLoginInCloudProvider();
  const listUsersFromCloudUsecase = makeCognitoListUserInCloudProvider();

  return new LoginInCloud({
    listUsersFromDatabaseUsecase,
    listUsersFromCloudUsecase,
    loginInCloudProvider,
  });
};
