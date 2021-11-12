import { FirstLoginCloudServiceError } from '@/application/errors/services/auth';
import { FirstLoginInCloudProvider } from '@/application/protocols/cloud/auth';
import { ListUserInCloudProvider } from '@/application/protocols/cloud/user';
import { FirstLoginUsecase, LoginUsecase } from '@/application/usecases/auth';
import { ListUsersUsecase } from '@/domain/user/usecases/user';

type FirstLoginCloudServiceInjectables = {
  listUsersUsecase: ListUsersUsecase;
  firstLoginInCloudProvider: FirstLoginInCloudProvider;
  listUserInCloudProvider: ListUserInCloudProvider;
  loginUsecase: LoginUsecase;
};

class FirstLoginCloudService implements FirstLoginUsecase {
  private readonly listUsersUsecase: ListUsersUsecase;
  private readonly firstLoginInCloudProvider: FirstLoginInCloudProvider;
  private readonly listUserInCloudProvider: ListUserInCloudProvider;
  private readonly loginUsecase: LoginUsecase;

  constructor({
    listUsersUsecase,
    firstLoginInCloudProvider,
    listUserInCloudProvider,
    loginUsecase,
  }: FirstLoginCloudServiceInjectables) {
    this.listUsersUsecase = listUsersUsecase;
    this.firstLoginInCloudProvider = firstLoginInCloudProvider;
    this.listUserInCloudProvider = listUserInCloudProvider;
    this.loginUsecase = loginUsecase;
  }

  async firstLogin(
    loginParams: FirstLoginUsecase.Params
  ): Promise<FirstLoginUsecase.Result> {
    const { email, newPassword, temporaryPassword } = loginParams;

    const { totalUsers } = await this.listUsersUsecase.list({ email });

    if (totalUsers === 0) {
      throw new FirstLoginCloudServiceError(
        `User with email: ${email}, not found`
      );
    }

    const userInCloud = await this.listUserInCloudProvider.listUser({ email });

    const userInCloudStatus = userInCloud.status;

    if (userInCloudStatus !== 'FORCE_CHANGE_PASSWORD') {
      throw new FirstLoginCloudServiceError('User already make first login');
    }

    await this.firstLoginInCloudProvider.firstLogin({
      email,
      newPassword,
      temporaryPassword,
    });

    const { accessToken, refreshToken } = await this.loginUsecase.login({
      email,
      password: newPassword,
    });

    return { accessToken, refreshToken };
  }
}

export { FirstLoginCloudService };
