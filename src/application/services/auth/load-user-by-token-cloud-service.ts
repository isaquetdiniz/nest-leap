import { LoadUserByTokenCloudServiceError } from '@/application/errors/services/auth';
import { LoadUserByTokenInCloudProvider } from '@/application/protocols/cloud/auth';
import { LoadUserByTokenCloudUsecase } from '@/application/usecases/auth';

type LoadUserByTokenCloudServiceInjectables = {
  loadUserByTokenInCloudProvider: LoadUserByTokenInCloudProvider;
};

class LoadUserByTokenCloudService implements LoadUserByTokenCloudUsecase {
  private readonly loadUserByTokenInCloudProvider: LoadUserByTokenInCloudProvider;

  constructor({
    loadUserByTokenInCloudProvider,
  }: LoadUserByTokenCloudServiceInjectables) {
    this.loadUserByTokenInCloudProvider = loadUserByTokenInCloudProvider;
  }

  async loadUser(
    loadUserParams: LoadUserByTokenCloudUsecase.Params
  ): Promise<LoadUserByTokenCloudUsecase.Result> {
    const { token } = loadUserParams;

    const userInCloud = await this.loadUserByTokenInCloudProvider.loadUser({
      token,
    });

    if (!userInCloud) {
      throw new LoadUserByTokenCloudServiceError('User not found');
    }

    return userInCloud;
  }
}

export { LoadUserByTokenCloudService };
