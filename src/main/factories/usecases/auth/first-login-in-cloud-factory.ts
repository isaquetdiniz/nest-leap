import { FirstLoginInCloudUsecase } from '@/domain/usecases/auth';
import {
  makeCognitoFirstLoginInCloudProvider,
  makeCognitoListUserInCloudProvider,
} from '@/main/factories/infra/cloud/cognito';
import { makeListUsersFromDatabaseUsecase } from '@/main/factories/usecases/user';
import { makeLoginInCloudCloudUsecase } from '@/main/factories/usecases/auth';
import { FirstLoginInCloud } from '@/domain/usecases/auth/first-login-in-cloud/first-login-in-cloud';

export const makeFirstLoginInCloudUsecase = (): FirstLoginInCloudUsecase => {
  const listUsersFromDatabaseUsecase = makeListUsersFromDatabaseUsecase();
  const listUsersFromCloudUsecase = makeCognitoListUserInCloudProvider();
  const firstLoginInCloudProvider = makeCognitoFirstLoginInCloudProvider();
  const loginInCloudUsecase = makeLoginInCloudCloudUsecase();

  return new FirstLoginInCloud({
    listUsersFromDatabaseUsecase,
    listUsersFromCloudUsecase,
    firstLoginInCloudProvider,
    loginInCloudUsecase,
  });
};
