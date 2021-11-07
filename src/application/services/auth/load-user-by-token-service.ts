import { LoadUserByTokenServiceError } from '@/application/errors/services/auth';
import {
  LoadUserByTokenCloudUsecase,
  LoadUserByTokenUsecase,
} from '@/application/usecases/auth';
import { ListUsersUsecase } from '@/domain/usecases/user';

type LoadUserByTokenServiceInjectables = {
  loadUserByTokenCloudUsecase: LoadUserByTokenCloudUsecase;
  listUsersUsecase: ListUsersUsecase;
};

class LoadUserByTokenService implements LoadUserByTokenUsecase {
  private readonly loadUserByTokenCloudUsecase: LoadUserByTokenCloudUsecase;
  private readonly listUsersUsecase: ListUsersUsecase;

  constructor({
    loadUserByTokenCloudUsecase,
    listUsersUsecase,
  }: LoadUserByTokenServiceInjectables) {
    this.listUsersUsecase = listUsersUsecase;
    this.loadUserByTokenCloudUsecase = loadUserByTokenCloudUsecase;
  }

  async loadUser(
    loadUserParams: LoadUserByTokenUsecase.Params
  ): Promise<LoadUserByTokenUsecase.Result> {
    const { token } = loadUserParams;

    const userInCloud = await this.loadUserByTokenCloudUsecase.loadUser({
      token,
    });

    if (!userInCloud) {
      throw new LoadUserByTokenServiceError('User not found in cloud');
    }

    const { email } = userInCloud;

    const { users, totalUsers } = await this.listUsersUsecase.list({ email });

    if (totalUsers === 0) {
      throw new LoadUserByTokenServiceError('User not found in database');
    }

    const [user] = users;

    return user;
  }
}

export { LoadUserByTokenService };
