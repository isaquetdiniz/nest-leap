import {
  CreateUserInCloud,
  CreateUserInCloudUsecase,
} from '@/domains/user/usecases/create-user-in-cloud';
import {
  makeCognitoSaveUserInCloudRepository,
  makeCognitoListUsersFromCloudRepository,
} from '@/main/factories/infra/cloud/cognito';

export const makeCreateUserInCloudUsecase = (): CreateUserInCloudUsecase => {
  const saveUserInCloudRepository = makeCognitoSaveUserInCloudRepository();

  const listUsersFromCloudUsecase = makeCognitoListUsersFromCloudRepository();

  return new CreateUserInCloud({
    saveUserInCloudRepository,
    listUsersFromCloudUsecase,
  });
};
