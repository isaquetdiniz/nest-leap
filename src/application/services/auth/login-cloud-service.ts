import { LoginCloudServiceError } from '@/application/errors/services/auth';
import { LoginInCloudProvider } from '@/application/protocols/cloud/auth';
import { ListUserInCloudProvider } from '@/application/protocols/cloud/user';
import { LoginUsecase } from '@/application/usecases/auth';
import { ListUsersUsecase } from '@/domain/usecases/user';

type LoginCloudServiceInjectables = {
  listUsersUsecase: ListUsersUsecase;
  loginInCloudProvider: LoginInCloudProvider;
  listUserInCloudProvider: ListUserInCloudProvider;
};

class LoginCloudService implements LoginUsecase {
  private readonly loginInCloudProvider: LoginInCloudProvider;
  private readonly listUsersUsecase: ListUsersUsecase;
  private readonly listUserInCloudProvider: ListUserInCloudProvider;

  constructor({
    loginInCloudProvider,
    listUsersUsecase,
    listUserInCloudProvider,
  }: LoginCloudServiceInjectables) {
    this.listUsersUsecase = listUsersUsecase;
    this.loginInCloudProvider = loginInCloudProvider;
    this.listUserInCloudProvider = listUserInCloudProvider;
  }

  async login(loginParams: LoginUsecase.Params): Promise<LoginUsecase.Result> {
    const { email, password } = loginParams;

    const { users, totalUsers } = await this.listUsersUsecase.list({ email });

    if (totalUsers === 0) {
      throw new LoginCloudServiceError(`User with email: ${email}, not found`);
    }

    const userInCloud = await this.listUserInCloudProvider.listUser({ email });

    const userInCloudStatus = userInCloud.status;

    if (userInCloudStatus === 'FORCE_CHANGE_PASSWORD') {
      throw new LoginCloudServiceError('User need make first login');
    }

    if (userInCloudStatus === 'NEW_PASSWORD_REQUIRED') {
      throw new LoginCloudServiceError('User need to set a new password');
    }

    const { accessToken, refreshToken } = await this.loginInCloudProvider.login(
      {
        email,
        password,
      }
    );

    const [user] = users;

    return { accessToken, refreshToken, user };
  }
}

export { LoginCloudService };
