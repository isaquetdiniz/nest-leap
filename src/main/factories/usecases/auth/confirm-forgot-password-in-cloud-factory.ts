import { ConfirmForgotPasswordInCloudUsecase } from '@/domain/usecases/auth';
import { ConfirmForgotPasswordInCloud } from '@/domain/usecases/auth/confirm-forgot-password-in-cloud/confirm-forgot-password-in-cloud';
import {
  makeCognitoConfirmForgotPasswordInCloudProvider,
  makeCognitoListUserInCloudProvider,
} from '@/main/factories/infra/cloud/cognito';
import { makeListUsersFromDatabaseUsecase } from '@/main/factories/usecases/user';
import { makeLoginInCloudCloudUsecase } from './login-in-cloud-factory';

export const makeConfirmForgotPasswordInCloudUsecase =
  (): ConfirmForgotPasswordInCloudUsecase => {
    const listUsersFromDatabaseUsecase = makeListUsersFromDatabaseUsecase();
    const listUsersFromCloudUsecase = makeCognitoListUserInCloudProvider();

    const confirmForgotPasswordInCloudProvider =
      makeCognitoConfirmForgotPasswordInCloudProvider();
    const loginInCloudUsecase = makeLoginInCloudCloudUsecase();

    return new ConfirmForgotPasswordInCloud({
      listUsersFromCloudUsecase,
      listUsersFromDatabaseUsecase,
      confirmForgotPasswordInCloudProvider,
      loginInCloudUsecase,
    });
  };
