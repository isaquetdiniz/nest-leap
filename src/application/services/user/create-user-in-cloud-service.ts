import { CreateUserInCloudProvider } from '@/application/protocols/cloud/user';
import { CreateUserCloudUsecase } from '@/application/usecases/user';

type CreateUserCloudServiceInjectables = {
  createUserInCloudProvider: CreateUserInCloudProvider;
};

class CreateUserCloudService implements CreateUserCloudUsecase {
  private readonly createUserInCloudProvider: CreateUserInCloudProvider;

  constructor({
    createUserInCloudProvider,
  }: CreateUserCloudServiceInjectables) {
    this.createUserInCloudProvider = createUserInCloudProvider;
  }

  async create(
    userParams: CreateUserCloudUsecase.Params
  ): Promise<CreateUserCloudUsecase.Result> {
    const { email } = userParams;

    await this.createUserInCloudProvider.createUser({ email });
  }
}

export { CreateUserCloudService };
