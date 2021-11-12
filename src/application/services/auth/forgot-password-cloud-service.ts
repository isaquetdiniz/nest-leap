import { ForgotPasswordInCloudProviderError } from '@/application/errors/cloud/auth';
import { ForgotPasswordCloudServiceError } from '@/application/errors/services/auth';
import { ForgotPasswordInCloudProvider } from '@/application/protocols/cloud/auth';
import { ListUserInCloudProvider } from '@/application/protocols/cloud/user';
import { ForgotPasswordUsecase } from '@/application/usecases/auth';
import { ListUsersUsecase } from '@/domain/user/usecases/user';

type ForgotPasswordCloudServiceInjectables = {
  listUserInCloudProvider: ListUserInCloudProvider;
  forgotPasswordInCloudProvider: ForgotPasswordInCloudProvider;
  listUsersUsecase: ListUsersUsecase;
};

class ForgotPasswordCloudService implements ForgotPasswordUsecase {
  private readonly listUserInCloudProvider: ListUserInCloudProvider;
  private readonly forgotPasswordInCloudProvider: ForgotPasswordInCloudProvider;
  private readonly listUsersUsecase: ListUsersUsecase;

  constructor({
    listUserInCloudProvider,
    forgotPasswordInCloudProvider,
    listUsersUsecase,
  }: ForgotPasswordCloudServiceInjectables) {
    this.listUserInCloudProvider = listUserInCloudProvider;
    this.forgotPasswordInCloudProvider = forgotPasswordInCloudProvider;
    this.listUsersUsecase = listUsersUsecase;
  }

  async forgotPassword(
    forgotParams: ForgotPasswordUsecase.Params
  ): Promise<ForgotPasswordUsecase.Result> {
    const { email } = forgotParams;

    const userInCloud = await this.listUserInCloudProvider.listUser({ email });

    if (!userInCloud) {
      throw new ForgotPasswordCloudServiceError('User not found in cloud');
    }

    const { totalUsers } = await this.listUsersUsecase.list({ email });

    if (totalUsers === 0) {
      throw new ForgotPasswordInCloudProviderError(
        'User not found in database'
      );
    }

    if (userInCloud.status === 'FORCE_CHANGE_PASSWORD') {
      throw new ForgotPasswordCloudServiceError(
        'User need to make first login'
      );
    }

    await this.forgotPasswordInCloudProvider.forgotPassword({ email });
  }
}

export { ForgotPasswordCloudService };
