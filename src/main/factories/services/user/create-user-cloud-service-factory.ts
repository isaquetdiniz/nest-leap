import { CreateUserCloudService } from '@/application/services/user';
import { CreateUserCloudUsecase } from '@/application/usecases/user';
import { makeCognitoCreateUserInCloudProvider } from '@/main/factories/infra/cloud/cognito';

export const makeCreateUserClouUsecase = (): CreateUserCloudUsecase => {
  const createUserInCloudProvider = makeCognitoCreateUserInCloudProvider();

  return new CreateUserCloudService({
    createUserInCloudProvider,
  });
};
