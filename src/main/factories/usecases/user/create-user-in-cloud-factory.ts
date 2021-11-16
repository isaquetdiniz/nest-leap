import {
  CreateUserInCloud,
  CreateUserInCloudUsecase,
} from '@/domain/usecases/user/create-user-in-cloud';
import {
  makeCognitoCreateUserInCloudProvider,
  makeCognitoListUserInCloudProvider,
} from '@/main/factories/infra/cloud/cognito';

export const makeCreateUserInCloudUsecase = (): CreateUserInCloudUsecase => {
  const saveUserInCloudRepository = makeCognitoCreateUserInCloudProvider();

  const listUsersFromCloudUsecase = makeCognitoListUserInCloudProvider();

  return new CreateUserInCloud({
    saveUserInCloudRepository,
    listUsersFromCloudUsecase,
  });
};
