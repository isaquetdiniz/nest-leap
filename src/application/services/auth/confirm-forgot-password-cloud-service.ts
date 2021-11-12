import { ConfirmForgotPasswordCloudServiceError } from '@/application/errors/services/auth';
import {
  ConfirmForgotPasswordInCloudProvider,
  LoginInCloudProvider,
} from '@/application/protocols/cloud/auth';
import { ListUserInCloudProvider } from '@/application/protocols/cloud/user';
import { ConfirmForgotPasswordUsecase } from '@/application/usecases/auth';
import { ListUsersUsecase } from '@/domain/user/usecases/user';

type ConfirmForgotPasswordCloudServiceInjectables = {
  listUserInCloudProvider: ListUserInCloudProvider;
  confirmForgotPasswordInCloudProvider: ConfirmForgotPasswordInCloudProvider;
  listUsersUsecase: ListUsersUsecase;
  loginInCloudProvider: LoginInCloudProvider;
};

class ConfirmForgotPasswordCloudService
  implements ConfirmForgotPasswordUsecase
{
  private readonly listUserInCloudProvider: ListUserInCloudProvider;
  private readonly confirmForgotPasswordInCloudProvider: ConfirmForgotPasswordInCloudProvider;
  private readonly listUsersUsecase: ListUsersUsecase;
  private readonly loginInCloudProvider: LoginInCloudProvider;

  constructor({
    listUserInCloudProvider,
    confirmForgotPasswordInCloudProvider,
    listUsersUsecase,
    loginInCloudProvider,
  }: ConfirmForgotPasswordCloudServiceInjectables) {
    this.listUserInCloudProvider = listUserInCloudProvider;
    this.confirmForgotPasswordInCloudProvider =
      confirmForgotPasswordInCloudProvider;
    this.listUsersUsecase = listUsersUsecase;
    this.loginInCloudProvider = loginInCloudProvider;
  }

  async confirmForgotPassword(
    confirmForgotParams: ConfirmForgotPasswordUsecase.Params
  ): Promise<ConfirmForgotPasswordUsecase.Result> {
    const { email, verificationCode, newPassword } = confirmForgotParams;

    const userInCloud = await this.listUserInCloudProvider.listUser({ email });

    if (!userInCloud) {
      throw new ConfirmForgotPasswordCloudServiceError(
        'User not found in cloud'
      );
    }

    const { totalUsers } = await this.listUsersUsecase.list({ email });

    if (totalUsers === 0) {
      throw new ConfirmForgotPasswordCloudServiceError(
        'User not found in database'
      );
    }

    if (userInCloud.status === 'FORCE_CHANGE_PASSWORD') {
      throw new ConfirmForgotPasswordCloudServiceError(
        'User need to make first login'
      );
    }

    await this.confirmForgotPasswordInCloudProvider.confirmForgotPassword({
      email,
      verificationCode,
      newPassword,
    });

    const { accessToken, refreshToken } = await this.loginInCloudProvider.login(
      { email, password: newPassword }
    );

    return { accessToken, refreshToken };
  }
}

export { ConfirmForgotPasswordCloudService };
