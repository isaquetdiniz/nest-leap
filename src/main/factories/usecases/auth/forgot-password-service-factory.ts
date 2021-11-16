import { ForgotPasswordUsecase } from '@/domain/usecases/auth';
import {
  makeCognitoForgotPasswordInCloudProvider,
  makeCognitoListUserInCloudProvider,
} from '@/main/factories/infra/cloud/cognito';
import { ForgotPasswordCloudService } from '@/application/services/auth';
import { makeListUsersUsecase } from '../user';

export const makeForgotPasswordCloudService = (): ForgotPasswordUsecase => {
  const listUserInCloudProvider = makeCognitoListUserInCloudProvider();
  const forgotPasswordInCloudProvider =
    makeCognitoForgotPasswordInCloudProvider();
  const listUsersUsecase = makeListUsersUsecase();

  return new ForgotPasswordCloudService({
    listUserInCloudProvider,
    forgotPasswordInCloudProvider,
    listUsersUsecase,
  });
};
