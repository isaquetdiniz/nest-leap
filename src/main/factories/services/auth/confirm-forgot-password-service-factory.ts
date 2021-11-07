import { ConfirmForgotPasswordCloudService } from '@/application/services/auth';
import { ConfirmForgotPasswordUsecase } from '@/application/usecases/auth';
import {
  makeCognitoConfirmForgotPasswordInCloudProvider,
  makeCognitoListUserInCloudProvider,
  makeCognitoLoginInCloudProvider,
} from '@/main/factories/infra/cloud/cognito';
import { makeListUsersUsecase } from '@/main/factories/services/user';

export const makeConfirmForgotPasswordCloudService =
  (): ConfirmForgotPasswordUsecase => {
    const listUsersUsecase = makeListUsersUsecase();
    const listUserInCloudProvider = makeCognitoListUserInCloudProvider();

    const confirmForgotPasswordInCloudProvider =
      makeCognitoConfirmForgotPasswordInCloudProvider();
    const loginInCloudProvider = makeCognitoLoginInCloudProvider();

    return new ConfirmForgotPasswordCloudService({
      confirmForgotPasswordInCloudProvider,
      loginInCloudProvider,
      listUsersUsecase,
      listUserInCloudProvider,
    });
  };
